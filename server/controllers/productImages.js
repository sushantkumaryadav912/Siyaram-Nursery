const supabase = require("../utils/db");

async function getSingleProductImages(request, response) {
  const { id } = request.params;
  const { data, error } = await supabase
    .from("Image")
    .select("*")
    .eq("productID", id);
  if (error || !data.length) {
    return response.status(404).json({ error: "Images not found" });
  }
  return response.json(data);
}

async function createImage(request, response) {
  try {
    const { productID, image } = request.body;
    const { data, error } = await supabase
      .from("Image")
      .insert({ productID, image })
      .select();
    if (error) throw error;
    return response.status(201).json(data[0]);
  } catch (error) {
    console.error("Error creating image:", error);
    return response.status(500).json({ error: "Error creating image" });
  }
}

async function updateImage(request, response) {
  try {
    const { id } = request.params;
    const { productID, image } = request.body;
    const { data: existingImage, error: findError } = await supabase
      .from("Image")
      .select("*")
      .eq("productID", id)
      .single();
    if (findError || !existingImage) {
      return response
        .status(404)
        .json({ error: "Image not found for the provided productID" });
    }
    const { data, error } = await supabase
      .from("Image")
      .update({ productID, image })
      .eq("imageID", existingImage.imageID)
      .select();
    if (error) throw error;
    return response.json(data[0]);
  } catch (error) {
    console.error("Error updating image:", error);
    return response.status(500).json({ error: "Error updating image" });
  }
}

async function deleteImage(request, response) {
  try {
    const { id } = request.params;
    const { error } = await supabase.from("Image").delete().eq("productID", id);
    if (error) throw error;
    return response.status(204).send();
  } catch (error) {
    console.error("Error deleting image:", error);
    return response.status(500).json({ error: "Error deleting image" });
  }
}

module.exports = {
  getSingleProductImages,
  createImage,
  updateImage,
  deleteImage,
};