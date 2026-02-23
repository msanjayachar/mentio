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
};

type PlainTextSlide = {
  id: number;
  type: "plain_text";
  contents: string[];
};

type Slides = (MCQSlide | PlainTextSlide)[];
type Slides = MCQSlide[];

type Presentation = {
  title: string;
  slides: MCQSlide[];
};
