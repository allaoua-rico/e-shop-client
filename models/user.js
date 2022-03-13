const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: [
      {
        type: String,
        enum: ["user", "admin"],
      },
    ],
    default: ["user"],
  },
  created_at: {
    type: Date,
    default: () => Date.now(),
  },
});
module.exports =
  mongoose.models?.User || mongoose.model("User", UserSchema);