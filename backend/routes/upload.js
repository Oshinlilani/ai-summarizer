import express from "express";
import multer from "multer";
import pdfParse from "pdf-parse";

const router = express.Router();
const upload = multer({ dest: "upload/" });

router.post("/upload", upload.single("file"), async(req, res) => {
    if(req.file.mimetype === "application/pdf") {
        const dataBuffer = fs.readFileSync(req.file.path);
        const data = await pdfParse(dataBuffer);
        res.json({ text: data.text });
    } else {
        res.status(400).json({ error: "Unsupported file type" });
    }
});

export default router;
