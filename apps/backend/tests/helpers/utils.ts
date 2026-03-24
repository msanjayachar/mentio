import { request } from "../setup";
import { SignupUser, LoginUser } from "@shared/types";
import { McqQuestion } from "@shared/mcq";

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

export const updateSlideById = async (
  id: string,
  token: string,
  question?: string,
  options?: string[],
  allowMultiple?: boolean,
) => {
  const result = await request
    .patch(`/slides/${id}`)
    .set("Authorization", `Bearer ${token}`)
    .send({
      question,
      options,
      allowMultiple,
    });

  return result;
};

export const deleteSlides = async (token: string) => {
  const result = await request
    .delete("/slides")
    .set("Authorization", `Bearer ${token}`);

  return result;
};

export const deleteSlideById = async (id: string, token: string) => {
  const result = await request
    .delete(`/slides/${id}`)
    .set("Authorization", `Bearer ${token}`);

  return result;
};
