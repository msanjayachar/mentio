export type SlideType = "canvas" | "mcq" | "question";

export interface Slide {
  id: string;
  presentationId: string;
  type: SlideType;
  content: CanvasContent | MCQContent | QuestionContent;
  index: number;
}

export interface CanvasContent {
  strokes: Stroke[];
  backgroundColor?: string;
}

export interface Stroke {
  id: string;
  points: Point[];
  color: string;
  width: number;
  tool: "pen" | "eraser";
}

export interface Point {
  x: number;
  y: number;
}

export interface MCQContent {
  question: string;
  options: MCQOption[];
  timeLimit?: number;
}

export interface MCQOption {
  id: string;
  text: string;
}

export interface QuestionContent {
  text: string;
  allowMultiple?: boolean;
}

export interface Participant {
  id: string;
  name: string;
  socketId?: string;
}

export interface Presentation {
  id: string;
  title: string;
  mentorId: string;
  roomId: string;
  slides: Slide[];
}

export interface Answer {
  questionId: string;
  optionId?: string;
  text?: string;
}

export interface MCQResult {
  questionId: string;
  totalResponses: number;
  results: Record<string, number>;
}

// Events emitted by mentor
export type MentorEvent =
  | { type: "PRESENTATION_STARTED"; presentationId: string; roomId: string }
  | { type: "PRESENTATION_ENDED" }
  | { type: "SLIDE_CHANGE"; index: number; slideId: string }
  | { type: "SLIDE_ADDED"; slide: Slide; index: number }
  | { type: "SLIDE_UPDATED"; slideId: string; content: Slide["content"] }
  | { type: "SLIDE_DELETED"; slideId: string }
  | { type: "CANVAS_STROKE"; slideId: string; stroke: Stroke }
  | { type: "CANVAS_CLEAR"; slideId: string }
  | { type: "CANVAS_UNDO"; slideId: string }
  | { type: "QUESTION_SHOWN"; slideId: string; questionId: string }
  | { type: "QUESTION_HIDDEN"; slideId: string; questionId: string }
  | { type: "QUESTION_RESULT"; slideId: string; result: MCQResult }
  | { type: "QUESTION_TIME_UP"; slideId: string; questionId: string };

// Events emitted by mentee
export type MenteeEvent =
  | {
      type: "ANSWER_SUBMITTED";
      slideId: string;
      questionId: string;
      answer: Answer;
      participantId: string;
    }
  | {
      type: "QUESTION_ASKED";
      slideId: string;
      text: string;
      participantId: string;
    };

// Events from server
export type ServerEvent =
  | { type: "ROOM_JOINED"; roomId: string; participants: Participant[] }
  | { type: "ROOM_LEFT" }
  | { type: "PARTICIPANT_JOINED"; participant: Participant }
  | { type: "PARTICIPANT_LEFT"; participantId: string }
  | { type: "CONNECTION_LOST" }
  | { type: "RECONNECTED" }
  | MentorEvent
  | MenteeEvent;

// All events in the app
export type AppEvent = MentorEvent | MenteeEvent | ServerEvent;

// Event names for socket communication
export const EventNames = {
  // Client -> Server
  JOIN_ROOM: "join-room",
  LEAVE_ROOM: "leave-room",
  SLIDE_CHANGE: "slide-change",
  SLIDE_ADDED: "slide-added",
  SLIDE_UPDATED: "slide-updated",
  SLIDE_DELETED: "slide-deleted",
  CANVAS_STROKE: "canvas-stroke",
  CANVAS_CLEAR: "canvas-clear",
  CANVAS_UNDO: "canvas-undo",
  ANSWER_SUBMITTED: "answer-submitted",
  QUESTION_ASKED: "question-asked",
  PRESENTATION_START: "presentation-start",
  PRESENTATION_END: "presentation-end",

  // Server -> Client
  ROOM_JOINED: "room-joined",
  PARTICIPANT_JOINED: "participant-joined",
  PARTICIPANT_LEFT: "participant-left",
  SLIDE_CHANGED: "slide-changed",
  CANVAS_STROKE_RECEIVED: "canvas-stroke-received",
  ANSWER_RECEIVED: "answer-received",
  CONNECTION_LOST: "connection-lost",
  RECONNECTED: "reconnected",
} as const;

export type EventName = (typeof EventNames)[keyof typeof EventNames];
