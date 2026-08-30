import express from "express";
import cors from "cors";
import { pdfUploadsRouter, queryRouter } from "./Routers/main.router";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);
app.use("/api/upload_pdfs", pdfUploadsRouter);
app.use("/api/query", queryRouter);
const PORT = 3005;
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
