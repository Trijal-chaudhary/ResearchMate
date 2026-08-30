import { Request, Response } from "express";

export const pdfUploads = (req: Request, res: Response) => {
  // console.log(req.body);
  try {
    const files = req.files as Express.Multer.File[];
    console.log(files);

    res.status(200).json({ mess: "hello world" });
  } catch (error) {
    res.status(500).json({ mess: error });
  }
};
