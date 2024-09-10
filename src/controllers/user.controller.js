import { asyncHandler} from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
const registerUser = asyncHandler(async (req, res) => {
    const {fullname,email,username,password}=req.body
    if(
      [fullname,email,username,password].some((field)=>field?.trim()==="")
    ){
      throw new ApiError(400,"All field are required")
    }
    const existedUser=await User.findOne({
      $or:[{username},{email}]
    })
  
    
    if(existedUser){
      throw new ApiError(409,"username and email is already exist")
    }
    console.log(existedUser);

    const avatarLocalPath=req.fills?.avatar[0]?.path;
    const coverImageLocalPath=req.fills?.coverImage[0]?.path;

    if(!avatarLocalPath){
      throw new ApiError(400,"Avatar filed is required")
    }
    const avatar=await uploadOnCloudinary(avatarLocalPath)
    const coverImage=await uploadOnCloudinary(coverImageLocalPath)

 const user=await User.create({
      fullname,
      avatar:avatar.url,
      coverImage:coverImage?.url || "",
      email,
      password,
      username:username.toLowerCase()
    })
    const createUser=await User.findById(user._id).se
});

export { registerUser };
