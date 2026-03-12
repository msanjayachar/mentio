type LoginResponse =
  | {
      success: true;
      data: LoginUser;
      error: null;
    }
  | {
      success: false;
      data: null;
      error: string;
    };

type Option = {
  id: string;
  option: string;
  correctAnswer: boolean;
};

type MCQSlide = {
  id: string;
  type: "multiple_choice";
  question: string;
  options: Option[];
  correctAnswers: Option[];
  allowMultiple: boolean;
};

type PlainTextSlide = {
  id: string;
  type: "plain_text";
  contents: string[];
};

type Slides = (MCQSlide | PlainTextSlide)[];
type Slides = MCQSlide[];

type Presentation = {
  title: string;
  slides: MCQSlide[];
};
