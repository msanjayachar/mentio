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
    question: "What is the capital of Karnataka?",
    options: [
      {
        id: 1,
        text: "Bengaluru",
        correctAnswer: undefined,
      },
      {
        id: 2,
        text: "Tumakuru",
        correctAnswer: undefined,
      },
      {
        id: 3,
        text: "Mysuru",
        correctAnswer: undefined,
      },
      {
        id: 4,
        text: "Mangalore",
        correctAnswer: undefined,
      },
    ],
    correctAnswers: [],
    allowMultiple: false,
    required: true,
  },
  {
    id: 2,
    type: "plain_text",
    contents: [],
  },
  {
    id: 3,
    type: "plain_text",
    contents: [],
  },
  {
    id: 4,
    type: "plain_text",
    contents: [],
  },
  {
    id: 5,
    type: "multiple_choice",
    question: "",
    options: options,
    correctAnswers: [],
    allowMultiple: false,
    required: true,
  },
];
