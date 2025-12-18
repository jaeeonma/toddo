import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Main() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [list, setList] = useState("");
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editList, setEditList] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();

  const getUserInfo = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get("/users/me", {
        headers: { authorization: token }
      });
      setUserInfo(response.data);
      setShowProfile(true);
    } catch (err) {
      console.error(err);
    }
  };

  const getTodos = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    try {
      const response = await axios.get("/todos", {
        headers: { authorization: token }
      });
      setTodos(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreate = async () => {
    if (!title) {
      alert("제목을 입력하세요");
      return;
    }

    const token = localStorage.getItem("token");
    try {
      await axios.post(
        "/todos",
        { title, list },
        { headers: { authorization: token } }
      );
      setTitle("");
      setList("");
      getTodos();
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async (id) => {
    const token = localStorage.getItem("token");
    const todo = todos.find(t => t.todo_id === id);
    
    try {
      await axios.put(
        `/todos/${id}`,
        { 
          title: editTitle, 
          list: editList,
          completed: todo.completed 
        },
        { headers: { authorization: token } }
      );
      setEditId(null);
      getTodos();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`/todos/${id}`, {
        headers: { authorization: token }
      });
      getTodos();
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggle = async (id) => {
    const token = localStorage.getItem("token");
    const todo = todos.find(t => t.todo_id === id);
    
    try {
      await axios.put(
        `/todos/${id}`,
        { 
          title: todo.title, 
          list: todo.list,
          completed: !todo.completed 
        },
        { headers: { authorization: token } }
      );
      getTodos();
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    getTodos();
    
  }, []);

  return (
    <div className="App">
      <div className="container">
        <h1 className="title">TO DO LIST</h1>

        <div className="button-group">
          <button className="login-btn" onClick={getUserInfo}>
            내 정보 보기
          </button>
          <button className="signup-btn" onClick={handleLogout}>
            로그아웃
          </button>
        </div>

        {showProfile && userInfo && (
          <div className="profile-box">
            <h3>내 정보</h3>
            <p><strong>이메일:</strong> {userInfo.email}</p>
            <p><strong>이름:</strong> {userInfo.name}</p>
            <button onClick={() => setShowProfile(false)}>닫기</button>
          </div>
        )}

        <div className="login">
          <div className="input">
            <label>제목</label>
            <input
              type="text"
              placeholder="제목을 입력하세요"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="input">
            <label>내용</label>
            <input
              type="text"
              placeholder="내용을 입력하세요 (선택)"
              value={list}
              onChange={(e) => setList(e.target.value)}
            />
          </div>
          <button className="login-btn" onClick={handleCreate}>
            추가
          </button>
        </div>

        <div className="todo-list">
          {todos.map((todo) => (
            <div
              key={todo.todo_id}
              className={`todo-item ${todo.completed ? 'completed' : ''}`}
            >
              {editId === todo.todo_id ? (
                <>
                  <input
                    type="text"
                    className="edit-input"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />
                  <input
                    type="text"
                    className="edit-input"
                    value={editList}
                    onChange={(e) => setEditList(e.target.value)}
                  />
                  <button onClick={() => handleUpdate(todo.todo_id)}>
                    저장
                  </button>
                  <button onClick={() => setEditId(null)}>취소</button>
                </>
              ) : (
                <>
                  <h3>{todo.title}</h3>
                  <p>{todo.list}</p>
                  <button onClick={() => handleToggle(todo.todo_id)}>
                    {todo.completed ? "미완료" : "완료"}
                  </button>
                  <button
                    onClick={() => {
                      setEditId(todo.todo_id);
                      setEditTitle(todo.title);
                      setEditList(todo.list);
                    }}
                  >
                    수정
                  </button>
                  <button onClick={() => handleDelete(todo.todo_id)}>
                    삭제
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Main;