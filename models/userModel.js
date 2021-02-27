import mongoose from "mongoose";
import bcrypt from "bcryptjs";

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
    emergency: {
      type: String,
      default: "false",
      required: false,
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
    SOS: [
      {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          required: false,
        },
        name: {
          type: mongoose.Schema.Types.String,
          required: false,
          ref: "User",
        },
        email: {
          type: mongoose.Schema.Types.String,
          required: false,
          ref: "User",
        },
        location: {
          lat: {
            type: mongoose.Schema.Types.String,
            required: false,
          },
          lon: {
            type: mongoose.Schema.Types.String,
            required: false,
          },
        },
      },
    ],
    location: {
      lat: {
        type: String,
        required: false,
      },
      lon: {
        type: String,
        required: false,
      },
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  } else {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
});

const User = mongoose.model("User", userSchema);
export default User;
