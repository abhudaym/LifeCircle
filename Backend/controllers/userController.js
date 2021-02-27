import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";
import axios from "axios";

const getUsers = asyncHandler(async (req, res) => {
  const user = await User.find({});
  res.json(user);
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  const check = await user.matchPassword(password);
  console.log(check);
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or password");
  }
});
// Update circle
// Add user
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, email2 } = req.body;

  const data = await axios.get(`http://ip-api.com/json`);
  const lat = data.data.lat;
  const lon = data.data.lon;
  console.log(data.data);

  const user2 = await User.findOne({ email: email2 });

  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error("User Already exists!");
  }
  if (user2) {
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
      location: {
        lat,
        lon,
      },
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      circle: user.circle,
      token: generateToken(user._id),
      location: {
        lat,
        lon,
      },
    });
  } else if (!user2) {
    const user = await User.create({
      name,
      email,
      password,
      location: {
        lat,
        lon,
      },
    });
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
      location: {
        lat,
        lon,
      },
    });
  }
});

const updateCircle = asyncHandler(async (req, res) => {
  const user2 = await User.findOne({ email: req.body.email });

  const user = await User.findById(req.user._id);
  user.circle.push(user2);
  user.save();

  res.json({
    name: user.name,
    email: user.email,
    circle: user.circle,
    location: {
      lat,
      lon,
    },
  });
});

export { getUsers, registerUser, updateCircle, authUser };
