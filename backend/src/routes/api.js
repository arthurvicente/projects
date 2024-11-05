import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();

/***
 * This Express router handles file uploads and a simple API endpoint.
 * It demonstrates the use of Multer for handling file uploads and basic routing in Express.
 *
 * Key functionalities:
 * - Configure Multer for file storage and naming.
 * - Define routes for file upload and a simple API response.
 */

// Recreate __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Multer configuration for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "../uploads"); // Define the upload directory
    cb(null, uploadPath); // Set the upload path
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Set the file name to include a timestamp
  },
});

const upload = multer({ storage }); // Initialize Multer with the storage configuration

// Route for file uploads
router.post("/upload", upload.single("file"), (req, res) => {
  try {
    res.send({ message: "File uploaded successfully!", file: req.file }); // Send success response
  } catch (error) {
    console.error("Error uploading file:", error); // Log any errors
    res.status(500).send({ error: "Internal Server Error" }); // Send error response
  }
});

// Simple route to return a message
router.get("/", (req, res) => {
  try {
    res.send({ message: "Hello from the backend!" }); // Send a simple message
  } catch (error) {
    console.error("Error handling request:", error); // Log any errors
    res.status(500).send({ error: "Internal Server Error" }); // Send error response
  }
});

export default router;
