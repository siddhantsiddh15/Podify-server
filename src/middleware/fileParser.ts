import { Request, Response, NextFunction, RequestHandler } from "express";
import formidable, {File} from "formidable"

 
export interface RequestWithFiles extends Request {
  files?: { [key: string]: File };
}
 
export const fileParser: RequestHandler = async (req: RequestWithFiles, res, next) => {
  if (!req.headers["content-type"]?.startsWith("multipart/form-data;"))
    return res.status(422).json({ error: "Only accepts form-data!" });
 
  const form = formidable({ multiples: false });
 
    try{
        const [fields, files] = await form.parse(req);
        if (!req.body) req.body = {};

    for (let key in fields) {
        const field = fields[key];
        if (field) {
            req.body[key] = field[0];
        }
    }

    for (let key in files) {
        const file = files[key];

        if (!req.files) {
            req.files = {};
        }

        if (file) {
            req.files[key] = file[0];
        }
    }

    next();
    }catch(err){
        console.error("Formidable error:", err);
        res.status(500).json({ error: "File upload failed" });
    }
};
 
export default fileParser;




