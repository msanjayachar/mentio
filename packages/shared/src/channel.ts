import { socket } from "./socket";
import { AppEvent, EventNames } from "./events";

type EventHandler = (event: AppEvent) => void;
type Unsubscribe = () => void;

class PresentationChannel {
  private handlers: Set<EventHandler> = new Set();
  private roomId: string | null = null;
  private initialized = false;

  constructor() {
    this.initSocketListeners();
  }

  private initSocketListeners() {
    if (this.initialized) return;
    this.initialized = true;

    // Listen for participants list from server
    socket.on("participants", (participants: string[]) => {
      this.emit({
        type: "ROOM_JOINED",
        roomId: this.roomId || "",
        participants: participants.map((id, idx) => ({
          id,
          name: `User ${idx + 1}`,
        })),
      });
    });

    // Listen for slide changes from mentor
    socket.on("receive-slide", (slide: any) => {
      this.emit({
        type: "SLIDE_CHANGE",
        index: 0,
        slideId: slide?.id || "",
      });
    });

    socket.on("presentation-ended", (slide: any) => {
      this.emit({
        type: "PRESENTATION_ENDED",
      });
    });

    socket.on("connect", () => {
      this.emit({ type: "RECONNECTED" });
      if (this.roomId) {
        socket.emit("join-room", this.roomId);
      }
    });

    socket.on("disconnect", () => {
      this.emit({ type: "CONNECTION_LOST" });
    });
  }

  emit(event: AppEvent) {
    this.handlers.forEach((handler) => {
      handler(event);
    });
  }

  subscribe(handler: EventHandler): Unsubscribe {
    this.handlers.add(handler);
    return () => {
      this.handlers.delete(handler);
    };
  }

  join(roomId: string) {
    this.roomId = roomId;
    socket.emit("join-room", roomId);
  }

  leave() {
    if (this.roomId) {
      socket.emit("leave-room", this.roomId);
      this.roomId = null;
    }
  }

  // Send events to server
  sendSlideChange(index: number, slide: any) {
    socket.emit("send-slide", {
      roomId: this.roomId,
      slide,
    });
  }

  sendTimer(timer: number) {
    socket.emit("timer", {
      roomId: this.roomId,
      timer: timer,
    });
  }

  sendSlideAdded(slide: any, index: number) {
    socket.emit(EventNames.SLIDE_ADDED, { roomId: this.roomId, slide, index });
  }

  sendSlideUpdated(slideId: string, content: any) {
    socket.emit(EventNames.SLIDE_UPDATED, {
      roomId: this.roomId,
      slideId,
      content,
    });
  }

  sendSlideDeleted(slideId: string) {
    socket.emit(EventNames.SLIDE_DELETED, { roomId: this.roomId, slideId });
  }

  sendCanvasStroke(slideId: string, stroke: any) {
    socket.emit(EventNames.CANVAS_STROKE, {
      roomId: this.roomId,
      slideId,
      stroke,
    });
  }

  sendCanvasClear(slideId: string) {
    socket.emit(EventNames.CANVAS_CLEAR, { roomId: this.roomId, slideId });
  }

  sendCanvasUndo(slideId: string) {
    socket.emit(EventNames.CANVAS_UNDO, { roomId: this.roomId, slideId });
  }

  sendAnswerSubmitted(slideId: string, questionId: string, answer: any) {
    socket.emit(EventNames.ANSWER_SUBMITTED, {
      roomId: this.roomId,
      slideId,
      questionId,
      answer,
    });
  }

  sendQuestionAsked(slideId: string, text: string) {
    socket.emit(EventNames.QUESTION_ASKED, {
      roomId: this.roomId,
      slideId,
      text,
    });
  }

  sendPresentationStart(presentationId: string) {
    socket.emit(EventNames.PRESENTATION_START, {
      roomId: this.roomId,
      presentationId,
    });
  }

  sendPresentationEnd() {
    socket.emit(EventNames.PRESENTATION_END, { roomId: this.roomId });
  }

  getRoomId() {
    return this.roomId;
  }

  isConnected() {
    return socket.connected;
  }
}

let channelInstance: PresentationChannel | null = null;

export function getChannel(): PresentationChannel {
  if (!channelInstance) {
    channelInstance = new PresentationChannel();
  }
  return channelInstance;
}

export function createChannel(): PresentationChannel {
  return new PresentationChannel();
}
