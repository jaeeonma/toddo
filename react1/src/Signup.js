import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    // 입력 검증
    if (!email || !password || !name) {
      setMessage("모든 항목을 입력해주세요.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage("올바른 이메일 형식이 아닙니다.");
      return;
    }
    if ( !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(password)) {
      setMessage("비밀번호는 영어 대문자, 소문자, 특수문자, 숫자, 6글자 이상 포함입니다.");
      return;
    }

    try {
      const response = await axios.post("/auth/register", {
        email: email,
        password: password,
        name: name,
      });
      setMessage(response.data.message);
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      if (err.response) {
        setMessage(err.response.data.message);
      } else {
        setMessage("회원가입 실패");
      }
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1 className="title">TO DO LIST</h1>

        {message && <p className="message">{message}</p>}

        <div className="login">
          <div className="input">
            <label>이메일</label>
            <input
              type="email"
              placeholder="이메일을 입력하세요"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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

          <div className="input">
            <label>이름</label>
            <input
              type="text"
              placeholder="이름을 입력하세요"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <button className="login-btn" onClick={handleSignup}>
            회원가입
          </button>

          <button className="signup-btn" onClick={() => navigate("/")}>
            로그인으로 돌아가기
          </button>
        </div>
      </div>
    </div>
  );
}

export default Signup;