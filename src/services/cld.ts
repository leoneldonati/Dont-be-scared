import { v2 as cld } from "cloudinary";

cld.config({
  api_key: import.meta.env.CLOUDINARY_API_KEY,
  api_secret: import.meta.env.CLOUDINARY_API_SECRET,
  cloud_name: import.meta.env.CLOUDINARY_API_KEY,
});

let attempts = 0;
export const upload = async (path: string) => {
  try {
    const {
      height,
      width,
      public_id: publicId,
      secure_url: secureUrl,
    } = await cld.uploader.upload(path, { folder: "photos" });

    return {
      ok: true,
      uploaded: {
        height,
        width,
        publicId,
        secureUrl,
      }
    };
  } catch (err) {
    attempts++;

    if (attempts === 3)
      return {
        ok: false,
      };
    await cld.uploader.upload(path, { folder: "photos" });
  }
};
