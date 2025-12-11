import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [datas, setDatas] = useState([]);
  const getData = async () => {
    try {
      const response = await axios.get("/data");
      console.log(response.data);
      setDatas(response.data);
    } catch (err) {}
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post("/login", {
        user_id: userId,
        password: password,
      });
      const token = response.data.token;
      localStorage.setItem("token", token);

      console.log("토큰 저장:", token);
      setMessage(response.data.message);
    } catch (err) {
      console.error(err);

      if (err.response) {
        setMessage(err.response.data.message);
      } else {
        setMessage("서버 연결 실패");
      }
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App">
      <div className="container">
        <h1 className="title">TO DO LIST</h1>
        <p>{JSON.stringify(datas)}</p>

        {message && <p className="message">{message}</p>}

        <div className="login">
          <div className="input">
            <label>아이디</label>
            <input
              type="text"
              placeholder="아이디를 입력하세요"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </div>

          <div className="input">
            <label>비밀번호</label>
            <input
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="login-btn" onClick={handleLogin}>
            로그인
          </button>

          <button className="signup-btn">회원가입</button>
        </div>
      </div>
    </div>
  );
}

export default App;
