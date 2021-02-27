import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";

const getUsers = asyncHandler(async (req, res) => {
  const user = await User.find({});
  res.json(user);
});
// Update circle
// Add user
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, email2 } = req.body;

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
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      circle: user.circle,
      token: generateToken(user._id),
    });
  } else if (!user2) {
    const user = await User.create({
      name,
      email,
      password,
    });
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  }
});

const updateCircle = asyncHandler(async (req, res) => {
  // const objCircle = {email: req.body.email}
  // to update circle, we need to find the user whose circle
  // needs to be updated and then use spread operator to
  // populate the existing array and add the new user.
  const user2 = await User.findOne({ email: req.body.email });

  // await User.findOneAndUpdate({
  //   _id: req.user._id,
  //   {$push: {circle: objCircle}}
  // });

  const user = await User.findById(req.user._id);
  user.circle.push(user2);
  user.save();

  res.json({
    name: user.name,
    email: user.email,
    circle: user.circle,
  });
});

export { getUsers, registerUser, updateCircle };
