const express = require("express");
const mongoose = require("mongoose");
const { User, Account } = require("../db");
const zod = require("zod");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;
const authMiddleware = require("../middleware");

const router = express.Router();

const signupSchema = zod.object({
  username: zod.string(),
  password: zod.string(),
  firstName: zod.string(),
  lastName: zod.string(),
});
const signinSchema = zod.object({
  username: zod.string().email(),
  password: zod.string()
});

router.post("/signup", async (req, res) => {
  const body = req.body;

  const { success } = signupSchema.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "user already exist/ username and password in valid format",
    });
  }

  const user = await User.findOne({
    username: body.username,
  });

  if (user) {
    return res.json({
      message: "user already exist/ username and password in valid format",
    });
  }

  const dbUser = await User.create(body);

  const userId = dbUser._id;

  await Account.create({
    userId,
    balance: 1 + Math.random() * 10000,
  });

  const token = jwt.sign(
    {
      userId: dbUser._id,
    },
    JWT_SECRET
  );

  res.json({
    message: "user created successfully",
    token: token,
    signedIn: true,
  });
});

router.post("/signin", async (req, res) => {
  const body = req.body;

  const { success } = signinSchema.safeParse(body);

  if (!success) {
    return res.status(404).json({
      message: "enter valid username and password",
    });
  }



  const user = await User.findOne(body);

  if (user) {
    const token = jwt.sign(
      {
        userId: user._id,
      },
      JWT_SECRET
    );

    return res.status(200).json({
      message: "signed in successfully",
      token: token,
    });
  }
  else {
    return res.json({
    message: "Error signing in",
    });
  }

  
});

const updateSchema = zod.object({
  username: zod.string().optional(),
  password: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
});

router.put("/", authMiddleware, async (req, res) => {
  const { success, error } = updateSchema.safeParse(req.body);

  if (!success) {
    return res.json({
      message: "User validation failed",
    });
  }

  await User.updateOne({ _id: req.userId }, req.body);
  res.json({
    message: "user updated successfully",
  });
});

router.get("/bulk", authMiddleware, async (req, res) => {
  const filter = req.query.filter || "";

  const allUsers = await User.find({
    $or: [
      {
        firstName: {
          $regex: filter,
        },
      },
      {
        lastName: {
          $regex: filter,
        },
      },
    ],
  });
  const users = allUsers.filter((user) => req.userId != user._id.valueOf());
  res.json({
    user: users,
  });
});

module.exports = router;
