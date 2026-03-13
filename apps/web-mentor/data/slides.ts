export const options: Option[] = [
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

export const slides: (MCQSlide | PlainTextSlide)[] = [
  {
    id: "one",
    type: "multiple_choice",
    question: "",
    options: options,
    correctAnswers: [],
    allowMultiple: false,
  },
  {
    id: "two",
    type: "plain_text",
    contents: [""],
  },
];
