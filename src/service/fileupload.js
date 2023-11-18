import axios from "axios";

export async function FileUploadToCloud(image) {
  try {
    const formData = new FormData();
    const folder = import.meta.env.VITE_CLOUDINARY_KEY || "";
    const name = import.meta.env.VITE_CLOUDINARY_NAME;
    formData.append("upload_preset", folder);
    formData.append("file", image);
    const { data } = await axios.post(
      `https://api.cloudinary.com/v1_1/${name}/image/upload`,
      formData,
    );
    return data;
  } catch (err) {
    return err;
  }
}
