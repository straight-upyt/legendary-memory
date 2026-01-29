import "dotenv/config";
import express, { Application } from "express";
import { healthRouter } from "./api/health";
import { tradesRouter } from "./api/trades";

const app: Application = express();

// middleware
app.use(express.json());

// routes
app.use("/api/health", healthRouter);
app.use("/api/trades", tradesRouter);

// port (ensure number)
const PORT = Number(process.env.PORT) || 3000;

// start server
app.listen(PORT, () => {
  console.log(` API running on http://localhost:${PORT}`);
});

// optional export for testing
export default app;
"scripts": {
  "engine": "tsx src/latency/index.ts"
}

