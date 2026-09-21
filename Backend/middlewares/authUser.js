import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {

  console.log("AUTH USER MIDDLEWARE RUNNING");
  
  try {
    const { token } = req.headers;

    if (!token) {
      return res.json({
        success: false,
        message: "Not Authorized. Login Again.",
      });
    }

    const token_decode = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.userId = token_decode.id;
    

    next();

  } catch (error) {
    console.error("User Auth Error:", error);

    res.json({
      success: false,
      message: "Invalid Token",
    });
  }
};

export default authUser;