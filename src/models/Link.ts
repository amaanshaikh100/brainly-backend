import mongoose from "mongoose";

const linkSchema = new mongoose.Schema({
  hash: { type: String, required: [true, "Cannot leave hash empty."] },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
});

const Link = mongoose.model("Link", linkSchema);

export default Link;
