import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
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

    circle: [
      {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          required: false,
        },
        name: {
          type: mongoose.Schema.Types.String,
          required: false,
        },
        email: {
          type: mongoose.Schema.Types.String,
          required: false,
        },
      },
    ],
    // medicalDocs: {
    //     id:
    // }
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;
