import { request } from "../setup";
import { McqQuestion } from "../../../../packages/shared/src/auth";

type SignupUser = {
  name: string;
  email: string;
  password: string;
};

type LoginUser = Omit<SignupUser, "name">;

export const signUpUserFn = async (user: SignupUser) => {
  const result = await request.post("/api/auth/signup").send(user);

  return result;
};

export const loginUserFn = async (user: LoginUser) => {
  const result = await request.post("/api/auth/login").send(user);

  return result;
};

export const me = async (token: string) => {
  const result = await request
    .get("/api/auth/me")
    .set("Authorization", `Bearer ${token}`);

  return result;
};

export const createSlides = async (mcqQuestion: McqQuestion, token: string) => {
  const result = await request
    .post("/slides")
    .send(mcqQuestion)

    .set("Authorization", `Bearer ${token}`);
  return result;
};

export const getSlides = async (token: string) => {
  const result = await request
    .get("/slides")
    .set("Authorization", `Bearer ${token}`);

  return result;
};

export const getSlideById = async (id: string, token: string) => {
  const result = await request
    .get(`/slides/${id}`)
    .set("Authorization", `Bearer ${token}`);

  return result;
};
