import Admin from "../models/Admin.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.json({
        success: false,
        message: "Admin not found",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      admin.password
    );

    if (!isPasswordCorrect) {
      return res.json({
        success: false,
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
      { id: admin._id },
      process.env.JWT_SECRET
    );

    res.json({
      success: true,
      message: "Admin login successful",
      token,
    });

  } catch (error) {
    console.error("Admin Login Error:", error);

    res.json({
      success: false,
      message: "Login failed",
    });
  }
};