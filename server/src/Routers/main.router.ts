import express from "express";
import { pdfUploads } from "../controllers/main.controller";
import uploadPDF from "../middleware/multer";

const pdfUploadsRouter = express.Router();

pdfUploadsRouter.post("/", uploadPDF.any(), pdfUploads);

export { pdfUploadsRouter };
