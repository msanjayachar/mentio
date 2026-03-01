import { describe, expect, it } from "vitest";
import { request } from "../setup";

describe("Test auth routes", () => {
  describe("Test /api/auth/signup", () => {
    it("returns message on successful user creation", async () => {
      const newUserData = {
        name: "username",
        email: "username@test.com",
        password: "password",
      };
      const res = await request.post("/api/auth/signup").send(newUserData);

      expect(res.body.success).toBeTruthy();
      expect(res.body.data.email).toEqual(newUserData.email);
      expect(typeof res.body.data.userId).toBe("string");
    });
  });

  describe("Test /api/auth/login", () => {
    it("returns message on successful user login", async () => {
      const userData = {
        email: "username@test.com",
        password: "password",
      };

      const res = await request.post("/api/auth/login").send(userData);

      expect(res.body.success).toBeTruthy();
      expect(typeof res.body.data.token).toBe("string");
      expect(res.body.data.user.email).toEqual(userData.email);
      expect(typeof res.body.data.user.userId).toBe("string");
    });
  });

  describe("Test /api/auth/me", () => {
    it("returns message on successful me fetch", async () => {
      const userData = {
        email: "username@test.com",
        password: "password",
      };

      const res = await request.post("/api/auth/login").send(userData);
      const token = res.body.data.token;

      const res_two = await request
        .get("/api/auth/me")
        .set("Authorization", `Bearer ${token}`);

      expect(res_two.body.success).toBeTruthy();
      expect(res_two.body.data.email).toEqual(userData.email);
    });
  });
});
