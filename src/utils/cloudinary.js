import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({ 
    cloud_name: 'dazuelmcb', 
    api_key: '443355495661694', 
    api_secret: 'a4iswGOuJd0cC2U9WRkNZCYRagM' 
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

        // Upload the file to Cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            // resource_type: "auto"
        });

        if (!response || !response.url) {
            throw new Error("Failed to retrieve URL from Cloudinary response");
        }

        // Remove the locally saved temporary file after a successful upload
        fs.unlinkSync(localFilePath);

        return response;
    } catch (error) {
        // Remove the locally saved temporary file if upload fails
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }

        // Log the error for debugging
        console.error("Error uploading file to Cloudinary:", error.message || error);

        return null;
    }
};

export { uploadOnCloudinary };
