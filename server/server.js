const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;
const pool = require("./db/db.js");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "my-secret-key-12345";

app.use(cors());
app.use(express.json());

app.get("/data", async (req, res) => {
  try {
    const response = await pool.query(
      // async 비동기 함수, await DB 결과를 기다림
      "select * from account" //모든 테이블 가져오기
    );
    res.status(200).json(response.rows[0]); //다른건 필요 없기 때문에 배열만 추출
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "데이터 조회 실패" });
  }
});

//로그인
app.post("/login", async (req, res) => {
  try {
    console.log("받은 데이터:", req.body);

    const { user_id, password } = req.body;

    console.log("user_id:", user_id);
    console.log("password:", password);

    const result = await pool.query(
      "SELECT * FROM account WHERE user_id = $1 AND password = $2",
      [user_id, password]
    );

    if (result.rows.length > 0) {
      const token = jwt.sign({ user_id: user_id }, SECRET_KEY, {
        expiresIn: "1h",
      });
      console.log("발급된 토큰:", token);
      res.status(200).json({ message: "로그인 성공", token: token });
    } else {
      res.status(401).json({ message: "아이디 또는 비밀번호가 틀립니다." });
    }
  } catch (err) {
    console.error("에러 발생:", err);
    res.status(500).json({ error: "로그인 실패" });
  }
});
//------------
app.get("/", (req, res) => {
  res.json({ message: "Server is running!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error(" DB 연결 실패:", err.message);
  } else {
    console.log(" DB 연결 성공!", res.rows[0].now);
  }
});
