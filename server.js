import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import User from "./models/userModel.js";
import Circle from "./models/circleModel.js";
import asyncHandler from "express-async-handler";

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running!");
});

app.get(
  "/api/user",
  asyncHandler(async (req, res) => {
    const user = await User.find({});
    res.json(user);
  })
);

app.post(
  "/api/user",
  asyncHandler(async (req, res) => {
    const { name, email, password, email2 } = req.body;

    const user2 = await User.findOne({ email: email2 });

    const user = await User.create({
      name,
      email,
      password,
      circle: [
        {
          _id: user2._id,
          name: user2.name,
          email: user2.email,
        },
      ],
    });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      circle: user.circle,
    });
  })
);

// app.post(
//   "/api/circle",
//   asyncHandler(async (req, res) => {
//     const { email } = req.body;

//     const user = await User.findOne({ email })
//       .populate("circles")
//       .exec((err, circles) => {
//         console.log("Populated User" + circles);
//       });
//   })
// );

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(`Server running on ${PORT} in ${process.env.NODE_ENV}`)
);

// const user = await User.create({
//   name,
//   email,
//   password,
// });

// res.json({
//   _id: user._id,
//   name: user.name,
//   email: user.email,
//   circle: user.circle,
// });
