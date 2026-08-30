import express from "express";
import {
  clearUploadFolder,
  pdfUploads,
  query,
} from "../controllers/main.controller";
import uploadPDF from "../middleware/multer";

const pdfUploadsRouter = express.Router();
const queryRouter = express.Router();

pdfUploadsRouter.post("/", clearUploadFolder, uploadPDF.any(), pdfUploads);
queryRouter.post("/", query);

export { pdfUploadsRouter, queryRouter };
