import { Request, Response, NextFunction, RequestHandler } from "express";
import formidable, { File } from "formidable";

export interface RequestWithFiles extends Request {
  files?: { [key: string]: File };
}

export const fileParser: RequestHandler = async (req: RequestWithFiles, res, next) => {
  if (!req.headers["content-type"]?.includes("multipart/form-data"))
    return res.status(422).json({ error: "Only accepts form-data!" });

  const form = formidable({
    multiples: false,
    keepExtensions: true,
  });

  try {
    const { fields, files } = await new Promise<{fields : formidable.Fields, files: formidable.Files}>((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) return reject(err);
        resolve({ fields, files });
      });
    });



    req.body = { ...req.body };
    req.files = {};

    for (const key in fields) {
      req.body[key] = Array.isArray(fields[key]) ? fields[key][0] : fields[key];
    }

    for (const key in files) {
      const file = Array.isArray(files[key]) ? files[key][0] : files[key];
      if (file) req.files[key] = file;
    }

    next();
  } catch (err) {
    console.error("Formidable error:", err);
    return res.status(500).json({ error: "File upload failed" });
  }
};

export default fileParser;
