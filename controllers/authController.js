const { auth } = require("../config/firebase");
exports.signup = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (
      typeof fullName !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string" ||
      !fullName.trim() ||
      !email.trim() ||
      !password
    ) {
      return res.status(400).json({
        message: "Full name, email, and password are required."
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must contain at least 6 characters."
      });
    }

    const user = await auth.createUser({
      displayName: fullName.trim(),
      email: email.trim(),
      password
    });

    return res.status(201).json({
      message: "User registered successfully.",
      user: {
        uid: user.uid,
        fullName: user.displayName,
        email: user.email
      }
    });
  } catch (error) {
    console.error("Signup error:", error.code || error.message);

    if (error.code === "auth/email-already-exists") {
      return res.status(409).json({
        message: "This email is already registered."
      });
    }

    if (error.code === "auth/invalid-email") {
      return res.status(400).json({
        message: "Please enter a valid email address."
      });
    }

    if (error.code === "auth/invalid-password") {
      return res.status(400).json({
        message: "The password does not meet Firebase requirements."
      });
    }

    return res.status(500).json({
      message: "Registration failed."
    });
  }
};


exports.signin = async (req, res) => {
  try {
    const { idToken } = req.body;

    if (typeof idToken !== "string" || !idToken.trim()) {
      return res.status(400).json({
        message: "Firebase ID token is required."
      });
    }

    const decodedToken = await auth.verifyIdToken(idToken);

    return res.status(200).json({
      message: "Token verified successfully.",
      user: {
        uid: decodedToken.uid,
        email: decodedToken.email || null
      }
    });
  } catch (error) {
    console.error("Token verification error:", error.code || error.message);

    return res.status(401).json({
      message: "Invalid or expired Firebase ID token."
    });
  }
};
