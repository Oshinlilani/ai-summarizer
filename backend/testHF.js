import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

async function testHF() {
  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: "The quick brown fox jumps over the lazy dog.",
        }),
      }
    );

    const data = await response.json();
    console.log("HF API Response:", data);
  } catch (error) {
    console.error("Error calling Hugging Face:", error);
  }
}

testHF();
