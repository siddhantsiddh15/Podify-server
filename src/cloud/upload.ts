import cloudinary from "#/cloud";
import {File} from "formidable";

export const uploadToCloud = async (file : File) => {
    return await cloudinary.uploader.upload(file.filepath, {
        folder: "profiles",
        resource_type: "image",
        width: 300,
        height : 300,
        crop: "thumb",
        gravity: "face"
    })
}

export const removeFromCloud = async (id : any): Promise<any> => {
    return await cloudinary.uploader.destroy(id);
}