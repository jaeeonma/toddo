const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../db/db");

// 회원가입
exports.register = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name)
      return res.status(400).json({ message: "모든 항목을 입력해주세요." });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return res.status(400).json({ message: "올바른 이메일 형식이 아닙니다." });
    if (password.length < 6)
      return res.status(400).json({ message: "비밀번호는 최소 6자 이상이어야 합니다." });

    const check = await pool.query("SELECT * FROM account WHERE email = $1", [email]);

    if (check.rows.length > 0) {
      return res.status(400).json({ message: "이미 존재하는 이메일입니다." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      "INSERT INTO account (email, password, name) VALUES ($1, $2, $3)",
      [email, hashedPassword, name]
    );

    res.status(200).json({ message: "회원가입 성공" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "회원가입 실패" });
  }
};

// 로그인
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await pool.query("SELECT * FROM account WHERE email = $1", [email]);

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "이메일 또는 비밀번호가 틀립니다." });
    }

    const isValid = await bcrypt.compare(password, result.rows[0].password);

    if (!isValid) {
      return res.status(401).json({ message: "이메일 또는 비밀번호가 틀립니다." });
    }

    const token = jwt.sign(
      { email: result.rows[0].email },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "로그인 성공",
      token: token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "로그인 실패" });
  }
};

// 이메일 중복 체크
exports.emailCheck = async (req, res) => {
  try {
    const { email } = req.body;
    const result = await pool.query("SELECT * FROM account WHERE email = $1", [email]);
    
    if (result.rows.length > 0) {
      return res.json({ available: false });
    }
    res.json({ available: true });
  } catch (err) {
    res.status(500).json({ error: "확인 실패" });
  }
};