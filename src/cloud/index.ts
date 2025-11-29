import {CLOUD_NAME, CLOUD_KEY, CLOUD_SECRET} from "#/config/variables"
import {v2 as cloudinary} from "cloudinary";

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_KEY,
  api_secret: CLOUD_SECRET,
  secure: true, // ensures HTTPS URL
});

export default cloudinary;