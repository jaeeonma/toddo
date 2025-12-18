const express = require("express");
const router = express.Router();
const usersController = require("../../controller/usersController");
const jwt = require("jsonwebtoken");

// 토큰 검증 미들웨어
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "토큰이 없습니다" });
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "유효하지 않은 토큰입니다" });
  }
};

router.get("/", verifyToken, usersController.getProfile);

module.exports = router;