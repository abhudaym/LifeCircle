import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const hospitalSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    contactNo: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    ambulance: [
      {
        availabilty: {
          type: Boolean,
          required: false,
        },
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
    ],
  },
  {
    timestamps: true,
  }
);

hospitalSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

hospitalSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const Hospital = mongoose.model("Hospital", hospitalSchema);
export default Hospital;
