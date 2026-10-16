
const { auth } = require("../config/firebase");

async function verifyToken(req, res, next) {
  try {
    const authorization = req.headers.authorization;

    if (!authorization || !authorization.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Authorization token is required."
      });
    }

    const idToken = authorization.slice(7).trim();

    if (!idToken) {
      return res.status(401).json({
        message: "Authorization token is required."
      });
    }

    const decodedToken = await auth.verifyIdToken(idToken);

    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email || null
    };

    next();
  } catch (error) {
    console.error("Authentication middleware error:", error.code || error.message);

    return res.status(401).json({
      message: "Invalid or expired authentication token."
    });
  }
}

module.exports = verifyToken;
