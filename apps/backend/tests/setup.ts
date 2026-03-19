import { afterAll } from "vitest";
import { app } from "../app";
import supertest from "supertest";
import { clearDatabase } from "../helpers/clearDatabase";
import dotenv from "dotenv";

dotenv.config({
  path: "./backend/tests/.env",
});

const request = supertest(app);

afterAll(async () => {
  await clearDatabase();
});

export { request };
