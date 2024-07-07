import { FastifyInstance } from "fastify";
import { register } from "./register";
import { authenticate } from "./authenticate";
import { verifyJwt } from "../middlewares/verify-jwt";
import { profile } from "./profile";

export async function appRoutes(app: FastifyInstance) {
  app.post("/users", register);

  app.post("/sessions", authenticate);

  app.get("/me", { onRequest: [verifyJwt] }, profile);
}
