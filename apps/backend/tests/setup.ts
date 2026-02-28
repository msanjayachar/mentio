import { afterAll } from "vitest";
import { app } from "../app";
import supertest from "supertest";
import { clearDatabase } from "../helpers/clearDatabase";

const request = supertest(app);

afterAll(async () => {
  await clearDatabase();
});

export { request };
