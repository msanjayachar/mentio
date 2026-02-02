type Option = {
  id: number;
  text: string;
  correctAnswer: boolean;
};

type MCQSlide = {
  id: number;
  type: "multiple_choice";
  question: string;
  options: Option[];
  correctAnswers: Option[];
  allowMultiple: boolean;
  required: boolean;
};

type PlainTextSlide = {
  id: number;
  type: "plain_text";
  contents: string[];
};
