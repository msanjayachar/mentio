import { beforeEach, describe, expect, it } from "vitest";
import { loginUserFn, me, signUpUserFn } from "../helpers/utils";
import { signUpUser, loginUser } from "../data/index";
import { clearDatabase } from "../../helpers/clearDatabase";
import "dotenv/config";

describe("Test auth routes", () => {
  describe("Test /api/auth/signup", () => {
    it("returns message on successful user creation", async () => {
      const res = await signUpUserFn(signUpUser);

      expect(res.body.success).toBeTruthy();
      expect(res.body.data.email).toEqual(signUpUser.email);
      expect(typeof res.body.data.userId).toBe("string");
    });
  });

  describe("Test /api/auth/login", () => {
    it("returns message on successful user login", async () => {
      await signUpUserFn(signUpUser);
      const res = await loginUserFn(loginUser);

      expect(res.body.success).toBeTruthy();
      expect(typeof res.body.data.token).toBe("string");
      expect(res.body.data.user.email).toEqual(loginUser.email);
      expect(typeof res.body.data.user.userId).toBe("string");
    });
  });

  describe("Test /api/auth/me", () => {
    it("returns message on successful me fetch", async () => {
      await signUpUserFn(signUpUser);

      const res = await loginUserFn(loginUser);
      const token = res.body.data.token;

      const res_two = await me(token);

      expect(res_two.body.success).toBeTruthy();
      expect(res_two.body.data.email).toEqual(loginUser.email);
    });
  });

  beforeEach(async () => {
    await clearDatabase();
  });
});
