import { RequestWithFiles } from "#/middleware/fileParser";
import { uploadToCloud, removeFromCloud } from "#/cloud/upload";
import { RequestHandler, Response } from "express";
import { allowedImageTypes } from "#/utils/constants";
import formidable from "formidable";
import User from "#/models/user";
import { formatProfile } from "#/utils/helper";

export const updateProfile: RequestHandler = async (
  req: RequestWithFiles,
  res: Response
) => {
  try {
    const { name } = req.body;
    const file = req.files?.avatar as formidable.File; // key name is avatar
    if (!allowedImageTypes.includes(file?.mimetype || "")) {
      return res.status(422).json({
        error: `Invalid file type.`,
      });
    }

    // Find User
    const user = await User.findById(req.user?.id);
    if (!user) throw new Error("Something went wrong. User not found");

    // Validate Name
    if (typeof name !== "string")
      return res.status(422).json({ error: "Invalid name" });

    if (name.trim().length < 3)
      return res.status(422).json({ error: "Invalid name" });

    user.name = name.trim();

    let uploadedFile = null;

    if (file) {
      // 1. Remove old avatar
      if (user.avatar?.public_id) {
        removeFromCloud(user.avatar.public_id);
      }
      uploadedFile = await uploadToCloud(file);
    }

    user.avatar = {
      url: uploadedFile?.secure_url as string,
      public_id: uploadedFile?.public_id as string,
    };

    // save the user
    await user.save();

    return res.json({
      profile: formatProfile(user),
      success: true,
      name,
      avatar: uploadedFile?.secure_url || null,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Profile update failed" });
  }
};

// import { BASE_URL } from "#/config/variables";
// import { Request, Response } from "express";
// import formidable from "formidable";
// import fs from "fs";
// import path from "path";

// export const updateProfileOld = async (req : Request, res : Response) => {
//     // validate content-type
//     if(!req.headers["content-type"]?.startsWith("multipart/form-data")){
//         return res.status(422).json({
//             error : "Only accepts form-data"
//         })
//     }

//     //create profile folder if not exists
//     const dir = path.join(__dirname, "../public/profiles");

//     try{
//         fs.readdirSync(dir);
//     }catch(err){
//         fs.mkdirSync(dir);
//     }

//     // create form instance and configure formiddable upload directory
//     let originalFilename = ''
//     const form = formidable({
//         uploadDir: dir,
//         keepExtensions: true, // keeps .jpg .png etc
//         filename : (name, ext, part) => {
//             let unique = Date.now();
//             let original = part.originalFilename || "";
//             originalFilename = `${unique}-${original}`;
//             return originalFilename
//         }
//     });

//     // parse request
//     form.parse(req, (err, fields, files) => {
//         if(err){
//             console.log(err);
//             return res.status(500).json({
//                 error: "File parsing error"
//             })
//         }

//         const uploadedFile = files.profile_name?.[0]
//         // console.log(">>>>>Fields", {files : files.profile_name?.[0], fields : fields.name?.[0]})

//         return res.json({
//             uploaded : true,
//             fileName: uploadedFile?.newFilename,
//             fileUrl: `${BASE_URL}/profiles/${originalFilename}`
//         })

//     });

// }
