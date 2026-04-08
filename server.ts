import express from "express";
import serverless from "serverless-http";

const app = express();

app.use(express.json());

app.get("/api/test", (req, res) => {
  res.json({ message: "OK" });
});

export default serverless(app);