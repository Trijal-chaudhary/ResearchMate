import express from "express";
import { clearUploadFolder, pdfUploads } from "../controllers/main.controller";
import uploadPDF from "../middleware/multer";

const pdfUploadsRouter = express.Router();

pdfUploadsRouter.post("/", clearUploadFolder, uploadPDF.any(), pdfUploads);

export { pdfUploadsRouter };
