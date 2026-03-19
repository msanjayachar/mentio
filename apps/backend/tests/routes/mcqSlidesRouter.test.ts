import { beforeAll, beforeEach, describe, expect, it } from "vitest";
import {
  signUpUserFn,
  loginUserFn,
  createSlides,
  getSlideById,
  updateSlideById,
  getSlides,
  deleteSlides,
  deleteSlideById,
} from "../helpers/utils";
import { signUpUser, loginUser, mcqQuestion } from "../data";
import { clearDatabase } from "../../helpers/clearDatabase";

describe("Test mcq slides routes", () => {
  describe("Test creating mcq slides", () => {
    it("returns message on successful mcq slides creation", async () => {
      await signUpUserFn(signUpUser);

      const res_login = await loginUserFn(loginUser);
      const token = res_login.body.data.token;
      const res = await createSlides(mcqQuestion, token);

      expect(res.body.success).toBeTruthy();
      expect(res.body.data.question).toEqual(mcqQuestion.question);
      expect(res.body.data.allow_multiple).toEqual(mcqQuestion.allowMultiple);
    });
  });

  describe("Test getting mcq slides", () => {
    it("returns message on successful mcq slides fetch", async () => {
      await signUpUserFn(signUpUser);
      const res_login = await loginUserFn(loginUser);

      const token = res_login.body.data.token;

      await createSlides(mcqQuestion, token);
      await createSlides(mcqQuestion, token);

      const res = await getSlides(token);

      expect(res.body.success).toBeTruthy();
      expect(res.body.data.slides[0].question).toEqual(mcqQuestion.question);
      expect(Array.isArray(res.body.data.slides[0].correct_answers)).toBe(true);
      expect(Array.isArray(res.body.data.slides[0].options)).toBe(true);
      expect(typeof res.body.data.slides[0].allow_multiple).toBe("boolean");
    });
  });

  describe("Test getting mcq slide by id", () => {
    it("returns message on successful mcq slide fetch", async () => {
      await signUpUserFn(signUpUser);

      const res_login = await loginUserFn(loginUser);
      const token = res_login.body.data.token;
      const res = await createSlides(mcqQuestion, token);
      const id = res.body.data.id;

      const result = await getSlideById(id, token);

      expect(result.body.success).toBeTruthy();
      expect(result.body.data.id).toEqual(id);
    });
  });

  describe("Test updating mcq slide by id", () => {
    it("returns message on successful mcq slide update", async () => {
      await signUpUserFn(signUpUser);

      const res_login = await loginUserFn(loginUser);
      const token = res_login.body.data.token;
      const res = await createSlides(mcqQuestion, token);
      const id = res.body.data.id;

      const question = "What is the capital of Karnataka ?";
      const result = await updateSlideById(id, token, question);

      expect(result.body.success).toBeTruthy();
      expect(result.body.data.question).toEqual(question);
    });
  });

  describe("Test deleting all mcq slides", () => {
    it("returns message on successful mcq slides delete", async () => {
      await signUpUserFn(signUpUser);

      const res_login = await loginUserFn(loginUser);

      const token = res_login.body.data.token;

      await createSlides(mcqQuestion, token);
      await createSlides(mcqQuestion, token);
      await createSlides(mcqQuestion, token);

      const res_delete = await deleteSlides(token);
      const res = await getSlides(token);

      expect(res_delete.body.success).toBeTruthy();
      expect(res.body.success).toBeTruthy();
      expect(res.body.data.slides.length).toEqual(0);
    });
  });

  describe("Test deleting particular mcq slide", () => {
    it("returns message on successful mcq slide delete by id", async () => {
      await signUpUserFn(signUpUser);

      const res_login = await loginUserFn(loginUser);

      const token = res_login.body.data.token;

      const res_create = await createSlides(mcqQuestion, token);

      const id = res_create.body.data.id;

      const res_delete = await deleteSlideById(id, token);
      const res = await getSlides(token);

      expect(res_delete.body.success).toBeTruthy();
      expect(res.body.success).toBeTruthy();
      expect(res.body.data.slides.length).toEqual(0);
    });
  });

  beforeEach(async () => {
    await clearDatabase();
  });
});
