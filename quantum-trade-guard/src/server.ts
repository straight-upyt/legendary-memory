import express from "express";

const app = express();

app.use(express.json());

// Root route (browser test)
app.get("/", (_req, res) => {
  res.send("🚀 Quantum Trade Guard is LIVE");
});

// Health check
app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    uptime: process.uptime(),
    time: new Date().toISOString()
  });
});

const PORT = Number(process.env.PORT) || 3000;

// IMPORTANT: listen on 0.0.0.0
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🌍 Server running at http://localhost:${PORT}`);
});
