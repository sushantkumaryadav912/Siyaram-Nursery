const path = require("path");
const { v4: uuidv4 } = require("uuid");

async function uploadMainImage(req, res) {
  try {
    if (!req.files || !req.files.uploadedFile) {
      return res.status(400).json({ message: "No files uploaded" });
    }
    const uploadedFile = req.files.uploadedFile;
    const ext = path.extname(uploadedFile.name);
    const filename = `${uuidv4()}${ext}`;
    const uploadPath = path.join(__dirname, "../../public/uploads", filename);
    await uploadedFile.mv(uploadPath);
    res.status(200).json({ imageUrl: `/uploads/${filename}` });
  } catch (error) {
    console.error("Error uploading image:", error);
    return res.status(500).json({ message: "Error uploading file" });
  }
}

module.exports = {
  uploadMainImage,
};