import mongoose from "mongoose";

const tagSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: [true, "Tag cannot be empty."],
  },
});

const Tag = mongoose.model("Tag", tagSchema);

export default Tag;
