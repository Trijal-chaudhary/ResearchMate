import { NextFunction, Request, Response } from "express";
import fs from "fs";
import path from "path";
export const clearUploadFolder = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const uploadPath = path.join(process.cwd(), "upload");

  const files = fs.readdirSync(uploadPath);

  for (const file of files) {
    const filePath = path.join(uploadPath, file);

    fs.unlinkSync(filePath);
  }

  next();
};
export const pdfUploads = async (req: Request, res: Response) => {
  // console.log(req.body);
  try {
    const files = req.files as Express.Multer.File[];
    console.log(files);
    const fileArray = [];

    for (const file of files) {
      fileArray.push({ path: file.path, name: file.filename });
    }

    const response = await fetch("http://127.0.0.1:8000/api/extract_pdf", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fileArray }),
    });
    res.status(200).json({ mess: "hello world" });
  } catch (error) {
    res.status(500).json({ mess: error });
  }
};
