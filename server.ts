import app from "./src/app";

const port = Number(process.env.PORT) || 8080;

if (!process.env.VERCEL) {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

export default app;