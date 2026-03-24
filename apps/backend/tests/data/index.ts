import type { SignupUser, LoginUser } from "@shared/types";
import type { CreateMcqQuestion, McqQuestion } from "@shared/mcq";

export const signUpUser: SignupUser = {
  name: "John Cena",
  email: "john@gmail.com",
  password: "password",
};

export const loginUser: LoginUser = {
  email: "john@gmail.com",
  password: "password",
};

export const mcqQuestion: CreateMcqQuestion = {
  question: "What is the capital of karnataka",
  options: [
    { id: "one", text: "Bengaluru", isCorrect: true },
    { id: "two", text: "Tumakuru", isCorrect: false },
    { id: "three", text: "Belagavi", isCorrect: false },
    { id: "four", text: "Mysuru", isCorrect: false },
  ],
  allowMultiple: false,
  presentationId: "string",
};
