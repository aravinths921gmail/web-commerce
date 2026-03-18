const User = require("../Model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Simple email validator
const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const Loginpost = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check required fields
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    //  Validate email format
    if (!validateEmail(email)) {
      return res.status(400).json({
        message: "Invalid email format",
      });
    }

    //  Find user
    const user = await User.findOne({
      email: email.toLowerCase().trim(),
    });

    //  Prevent user enumeration
    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    //  Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    //  Check JWT secret exists
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }

    //  Generate token
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRE || "7d",
      }
    );

    //Set HttpOnly cookie
    res.cookie("token", token, {
      httpOnly: true,                  // JS cannot read the cookie
      secure: process.env.NODE_ENV === "production", // only over HTTPS in production
      sameSite: "Lax",                 // mitigates CSRF
      maxAge: 24 * 60 * 60 * 1000      // 1 day
    });


    // Success response
    return res.status(200).json({
      message: "Login successful",
      token,
      role: user.role
    });

    

  } catch (error) {
    console.error("Login Error:", error.message);
    return res.status(500).json({
      message: "Something went wrong. Please try again later.",
    });
  }
};

module.exports = { Loginpost };