import { toast } from "sonner";

export const uploadImageToImgBB = async (imageFile) => {
  if (!imageFile || imageFile.size === 0) {
    toast.error("Please select an image file!");
    return null;
  }

  const imgBbFormData = new FormData();
  imgBbFormData.append("image", imageFile);

  try {
    const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

    const imgBbResponse = await fetch(
      `https://api.imgbb.com/1/upload?key=${apiKey}`,
      {
        method: "POST",
        body: imgBbFormData,
      },
    );

    const imgBbResult = await imgBbResponse.json();

    if (imgBbResult.success) {
      return imgBbResult.data.url;
    } else {
      toast.error("Image upload failed to ImgBB!");
      return null;
    }
  } catch (err) {
    toast.error("Something went wrong during image upload!");
    return null;
  }
};
