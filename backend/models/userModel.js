import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    userDetails: {
      name: {
        type: String,
        required: true,
        unique: true,
      },
      email: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
    },
    circleInfo: {
      user: [
        { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
      ],
    },
    // medicalDocs: {
    //     id:
    // }
  },
  {
    timestamps: true,
  }
);
