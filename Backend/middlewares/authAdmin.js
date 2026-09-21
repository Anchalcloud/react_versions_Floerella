import jwt from "jsonwebtoken";

const authAdmin = async (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) {
      return res.json({
        success: false,
        message: "Not Authorized. Login Again.",
      });
    }

    const token_decode = jwt.verify(token, process.env.JWT_SECRET);

    req.adminId = token_decode.id;

    next();

  } catch (error) {
    console.error("Auth Error:", error);

    res.json({
      success: false,
      message: "Invalid Token",
    });
  }
};

export default authAdmin;