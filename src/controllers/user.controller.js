import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const registerUser = asyncHandler(async (req, res) => {
    const { fullname, email, username, password } = req.body;
    
    if ([fullname, email, username, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }
    
    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    });
    
    if (existedUser) {
        throw new ApiError(409, "Username or email already exists");
    }

    const avatarLocalPath = req.files?.avatar?.[0]?.path;
    const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar field is required");
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    if (!avatar || !avatar.url) {
        throw new ApiError(500, "Failed to upload avatar to Cloudinary");
    }

    const coverImage = coverImageLocalPath ? await uploadOnCloudinary(coverImageLocalPath) : {};
    const coverImageUrl = coverImage.url || "";

    const user = await User.create({
        fullname,
        avatar: avatar.url,
        coverImage: coverImageUrl,
        email,
        password,
        username: username.toLowerCase()
    });
     console.log(user);
     
    const createUser = await User.findById(user._id).select("-password -refreshToken");

    if (!createUser) {
        throw new ApiError(500, "Something went wrong while registering the user");
    }
    
    return res.status(201).json(
        new ApiResponse(200, createUser, "User Registered Successfully")
    );
});

export { registerUser };
