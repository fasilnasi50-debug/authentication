
const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const verifyToken = require("../middleware/verifyToken");

router.post("/signup", authController.signup);
router.post("/signin", authController.signin);

router.get("/me", verifyToken, (req, res) => {
  return res.status(200).json({
    message: "Authenticated user retrieved successfully.",
    user: req.user
  });
});

module.exports = router;
