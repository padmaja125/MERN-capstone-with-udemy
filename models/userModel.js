import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    lastName: {
      type: String,
      default: "lastName",
    },
    location: {
      type: String,
      default: "My City",
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.toJson = function () {
  let obj = this.toObject();
  delete obj.password;
  return obj;
};

export default mongoose.model("user", userSchema);
