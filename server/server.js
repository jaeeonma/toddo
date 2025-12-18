require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;
const pool = require("./db/db");

app.use(cors());
app.use(express.json());

// 라우터 연결
app.use("/auth/login", require("./router/auth/login"));
app.use("/auth/register", require("./router/auth/register"));
app.use("/auth/email-check", require("./router/auth/emailCheck"));
app.use("/todos", require("./router/todos/allTodos"));
app.use("/users/me", require("./router/users/profile"));

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