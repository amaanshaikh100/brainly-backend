import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "email cannot be empty."],
    unique: true,
  },
  password: {
    type: String,
    minlength: 4,
    required: [true, "Password cannot be empty."],
  },
});

const User = mongoose.model("User", userSchema);

export default User;
