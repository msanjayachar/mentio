import type {
  SignupUser,
  LoginUser,
  McqQuestion,
} from "../../../../packages/shared/src/auth";

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
  question: "What is the capital of karnataka",
  options: ["Bengaluru", "Tumakuru", "Belagavi", "Mysuru"],
  correctAnswers: ["Bengaluru"],
  allowMultiple: false,
};
