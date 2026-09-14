import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import fs from "fs";

import authRouter from "./routes/auth.js";
import uploadRouter from "./routes/upload.js";
import { createProjectRouter } from "./routes/projectRouter.js";
import blogsRouter from "./routes/blogs.js";
import miscRouter from "./routes/misc.js";
import categoriesRouter from "./routes/categories.js";
import newsletterAdminRouter from "./routes/newsletter.js";

const app = express();

const UPLOAD_DIR =
  process.env.UPLOAD_DIR || "/tmp/uploads";

if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json({ limit: "5mb" }));
app.use(morgan("dev"));

app.use("/uploads", express.static(UPLOAD_DIR));
app.use("/api/uploads", express.static(UPLOAD_DIR));

app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    service: "etherauthority-api"
  });
});

app.use("/api/auth", authRouter);
app.use("/api/upload", uploadRouter);

app.use(
  "/api/games",
  createProjectRouter({
    model: "game",
    type: "game"
  })
);

app.use(
  "/api/dapps",
  createProjectRouter({
    model: "dapp",
    type: "dapp"
  })
);

app.use("/api/blogs", blogsRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/admin/newsletter", newsletterAdminRouter);
app.use("/api", miscRouter);

app.use((err, _req, res, _next) => {
  console.error("[error]", err);

  res.status(err.status || 500).json({
    error: err.message || "Server error"
  });
});

export default app;
