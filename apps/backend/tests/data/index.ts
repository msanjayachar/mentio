import type { SignupUser, LoginUser } from "@shared/auth";
import type { McqQuestion } from "@shared/mcq";

export const signUpUser: SignupUser = {
  name: "John Cena",
  email: "john@gmail.com",
  password: "password",
};

export const loginUser: LoginUser = {
  email: "john@gmail.com",
  password: "password",
};

export const mcqQuestion: McqQuestion = {
  id: "one",
  type: "multiple_choice",
  question: "What is the capital of karnataka",
  options: [
    { id: "one", option: "Bengaluru", correctAnswer: true },
    { id: "two", option: "Tumakuru", correctAnswer: false },
    { id: "three", option: "Belagavi", correctAnswer: false },
    { id: "four", option: "Mysuru", correctAnswer: false },
  ],
  correctAnswers: ["Bengaluru"],
  allowMultiple: false,
};
