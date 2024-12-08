const axios = require("axios");
const FormData = require("form-data");
require('dotenv').config();

const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID; // Store Client ID in .env

/**
 * Uploads an image to Imgur
 * @param {Buffer} imageBuffer - The image buffer (or base64 string)
 * @returns {Promise<Object>} - Imgur API response
 */
const uploadToImgur = async (imageBuffer) => {
    const form = new FormData();
    form.append("image", imageBuffer);

    try {
        const response = await axios.post("https://api.imgur.com/3/image", form, {
            headers: {
                Authorization: `Client-ID ${IMGUR_CLIENT_ID}`,
                ...form.getHeaders(),
            },
        });

        return response.data; // Returns the Imgur response
    } catch (error) {
        console.error("Imgur upload failed:", error.response.data);
        throw new Error("Failed to upload image to Imgur.");
    }
};

module.exports = { uploadToImgur };
