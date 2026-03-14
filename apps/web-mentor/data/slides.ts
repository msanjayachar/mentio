import type { McqQuestion, McqOption } from "@shared/mcq";

export const options: McqOption[] = [
  {
    id: "one",
    option: "",
    correctAnswer: false,
  },
  {
    id: "two",
    option: "",
    correctAnswer: false,
  },
  {
    id: "three",
    option: "",
    correctAnswer: false,
  },
];

export const slides: McqQuestion[] = [
  {
    id: "one",
    type: "multiple_choice",
    question: "",
    options: options,
    correctAnswers: [],
    allowMultiple: false,
  },
];
