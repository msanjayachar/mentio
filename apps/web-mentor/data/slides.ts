export const options: Option[] = [
  {
    id: 1,
    text: "Option 1",
    correctAnswer: undefined,
  },
  {
    id: 2,
    text: "Option 2",
    correctAnswer: undefined,
  },
  {
    id: 3,
    text: "Option 3",
    correctAnswer: undefined,
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
];
