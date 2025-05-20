import mongoose from "mongoose";

const contentTypes = ["image", "video", "article", "audio"];

const contentSchema = new mongoose.Schema({
  link: { type: String, required: [true, "A link cannot be empty."] },
  type: {
    type: String,
    enum: contentTypes,
    required: [true, "Required the type."],
  },
  title: { type: String, required: [true, "Title cannot be empty."] },
  tags: [{ type: mongoose.Types.ObjectId, ref: "Tag" }],
  userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
});

const Content = mongoose.model("Content", contentSchema);

export default Content;
