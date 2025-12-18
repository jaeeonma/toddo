const pool = require("../db/db");

// 내 정보 조회
exports.getProfile = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT email, name FROM account WHERE email = $1",
      [req.user.email]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "조회 실패" });
  }
};