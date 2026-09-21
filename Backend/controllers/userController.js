import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.json({
        success: false,
        message: "User already exists",
      });
    }

    // 2. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Create user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    // 4. Save user in MongoDB
    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User registered successfully",
    });

  } catch (error) {
    console.error("Registration Error:", error);

    res.json({
      success: false,
      message: "Registration failed",
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    // 2. Compare password
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.json({
        success: false,
        message: "Invalid password",
      });
    }

    // 3. Create JWT
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET
    );

    // 4. Send token
    res.json({
      success: true,
      message: "Login successful",
      token,
    });

  } catch (error) {
    console.error("User Login Error:", error);

    res.json({
      success: false,
      message: "Login failed",
    });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");

    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      user,
    });

  } catch (error) {
    console.error("Get Profile Error:", error);

    res.json({
      success: false,
      message: "Failed to get profile",
    });
  }
};