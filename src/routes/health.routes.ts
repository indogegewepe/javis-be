import { Router } from "express";

const healthRouter = Router();

healthRouter.get("/api/health", (_req, res) => {
  res.status(200).send("ok");
});

export default healthRouter;
