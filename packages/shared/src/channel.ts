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

    socket.on(EventNames.ROOM_JOINED, (data: any) => {
      this.emit({
        type: "ROOM_JOINED",
        roomId: data.roomId,
        participants: data.participants || [],
      });
    });

    socket.on(EventNames.PARTICIPANT_JOINED, (data: any) => {
      this.emit({ type: "PARTICIPANT_JOINED", participant: data.participant });
    });

    socket.on(EventNames.PARTICIPANT_LEFT, (data: any) => {
      this.emit({
        type: "PARTICIPANT_LEFT",
        participantId: data.participantId,
      });
    });

    socket.on(EventNames.SLIDE_CHANGED, (data: any) => {
      this.emit({
        type: "SLIDE_CHANGE",
        index: data.index,
        slideId: data.slideId,
      });
    });

    socket.on(EventNames.CANVAS_STROKE_RECEIVED, (data: any) => {
      this.emit({
        type: "CANVAS_STROKE",
        slideId: data.slideId,
        stroke: data.stroke,
      });
    });

    socket.on(EventNames.ANSWER_RECEIVED, (data: any) => {
      this.emit({
        type: "ANSWER_SUBMITTED",
        slideId: data.slideId,
        questionId: data.questionId,
        answer: data.answer,
        participantId: data.participantId,
      });
    });

    socket.on(EventNames.CONNECTION_LOST, () => {
      this.emit({ type: "CONNECTION_LOST" });
    });

    socket.io.on("reconnect", () => {
      this.emit({ type: "RECONNECTED" });
      if (this.roomId) {
        socket.emit(EventNames.JOIN_ROOM, { roomId: this.roomId });
      }
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
    socket.emit(EventNames.JOIN_ROOM, { roomId });
  }

  leave() {
    if (this.roomId) {
      socket.emit(EventNames.LEAVE_ROOM, { roomId: this.roomId });
      this.roomId = null;
    }
  }

  // Send events to server
  sendSlideChange(index: number, slideId: string) {
    socket.emit(EventNames.SLIDE_CHANGE, {
      roomId: this.roomId,
      index,
      slideId,
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
