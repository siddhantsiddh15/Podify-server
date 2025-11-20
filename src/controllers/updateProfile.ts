import { BASE_URL } from "#/config/variables";
import { Request, Response } from "express";
import formidable from "formidable";
import fs from "fs";
import path from "path";

export const updateProfile = async (req : Request, res : Response) => {
    // validate content-type
    if(!req.headers["content-type"]?.startsWith("multipart/form-data")){
        return res.status(422).json({
            error : "Only accepts form-data"
        })
    }

    //create profile folder if not exists
    const dir = path.join(__dirname, "../public/profiles");

    try{
        fs.readdirSync(dir);
    }catch(err){
        fs.mkdirSync(dir);
    }

    // create form instance and configure formiddable upload directory
    let originalFilename = ''
    const form = formidable({
        uploadDir: dir,
        keepExtensions: true, // keeps .jpg .png etc
        filename : (name, ext, part) => {
            let unique = Date.now();
            let original = part.originalFilename || "";
            originalFilename = `${unique}-${original}`;
            return originalFilename
        }
    });


    // parse request
    form.parse(req, (err, fields, files) => {
        if(err){
            console.log(err);
            return res.status(500).json({
                error: "File parsing error"
            })
        }

        const uploadedFile = files.profile_name?.[0]
        // console.log(">>>>>Fields", {files : files.profile_name?.[0], fields : fields.name?.[0]})

        return res.json({
            uploaded : true,
            fileName: uploadedFile?.newFilename,
            fileUrl: `${BASE_URL}/profiles/${originalFilename}`
        })

        
    });



}