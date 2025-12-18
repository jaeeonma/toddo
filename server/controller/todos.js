const pool = require("../db/db");

// Todo 목록 조회
exports.getAllTodos = async (req, res) => {
  try {
    const userResult = await pool.query(
      "SELECT account_id FROM account WHERE email = $1",
      [req.user.email]
    );
    
    const result = await pool.query(
      "SELECT * FROM todo WHERE account_id = $1 ORDER BY todo_id",
      [userResult.rows[0].account_id]
    );
    
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "조회 실패" });
  }
};

// Todo 생성
exports.createTodo = async (req, res) => {
  try {
    const { title, list } = req.body;
    
    if (!title) {
      return res.status(400).json({ message: "제목을 입력해주세요" });
    }
    
    const userResult = await pool.query(
      "SELECT account_id FROM account WHERE email = $1",
      [req.user.email]
    );
    
    await pool.query(
      "INSERT INTO todo (title, list, account_id) VALUES ($1, $2, $3)",
      [title, list || "", userResult.rows[0].account_id]
    );
    
    res.status(200).json({ message: "Todo 생성 완료" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "생성 실패" });
  }
};

// Todo 수정
exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, list, completed } = req.body;
    
    await pool.query(
      "UPDATE todo SET title = $1, list = $2, completed = $3 WHERE todo_id = $4",
      [title, list, completed, id]
    );
    
    res.status(200).json({ message: "수정 완료" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "수정 실패" });
  }
};

// Todo 삭제
exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    
    await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
    
    res.status(200).json({ message: "삭제 완료" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "삭제 실패" });
  }
};