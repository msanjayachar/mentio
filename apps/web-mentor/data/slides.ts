export const options: Option[] = [
  {
    id: 1,
    text: "",
    correctAnswer: false,
  },
  {
    id: 2,
    text: "",
    correctAnswer: false,
  },
  {
    id: 3,
    text: "",
    correctAnswer: false,
  },
];

export const slides: (MCQSlide | PlainTextSlide)[] = [
  {
    id: 1,
    type: "multiple_choice",
    question: "",
    options: options,
    correctAnswers: [],
    allowMultiple: false,
    required: true,
  },
  {
    id: 2,
    type: "plain_text",
    contents: [""],
  },
];
