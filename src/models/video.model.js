import mongoose, { Schema } from "mongoose";
import mongooseAggregatepaginate from "mongoose-aggregate-paginate-v2";

const videoSchame = new Schema(
  {
    videoFile: {
      type: String, //use cloudinary url
      required: true,
    },
    thumbnail: {
      type: String, //use cloudinary url
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    duration: {
      type: Number,
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);l
videoSchame.plugin("mongooseAggregatepaginate")


export const Video = mongoose.model("Video", videoSchame);
