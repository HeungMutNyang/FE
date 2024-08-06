//로그인 페이지
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import ring from "../assets/img/ring.png";
import doB from "../assets/img/doB_icon.png";
import cat from "../assets/img/cat.png";
import turtle from "../assets/img/turtle.png";
import crow from "../assets/img/crow.png";
import round_rect from "../assets/img/round_rect.png";
import calendar from "../assets/img/hospital.png";
import axios from "axios";
import { useAuth } from "../AuthContext";

export default function Login() {
  const [userEmail, setUserEmail] = useState("");
  const [userPwd, setUserPwd] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  //회원가입 클릭시
  const handleJoin = () => {
    navigate("/join");
  };

  //비밀번호 재설정 클릭시
  const handleSetPassword = () => {
    navigate("/settings/password");
  };

  //로그인 버튼 클릭시
  const handleLogin = () => {
    if (!(userEmail === "" || userPwd === "")) {
      const requestBody = {
        email: userEmail,
        password: userPwd,
        id: userEmail,
      };

      const token = localStorage.getItem("ACCESS_TOKEN");

      axios
        .post(
          `${process.env.REACT_APP_API_BASE_URL}/auth/signin`,
          requestBody,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          // login(token);
          console.log(response);
          login(response.data.token); // 로그인 상태 업데이트
          console.log("login", response.data.token);
          localStorage.setItem("email", response.data.email);
          // localStorage.setItem("username", response.data.username);
          navigate("/");
        })
        .catch((error) => {
          if (error.response) {
            alert(error.response.data.error);
          } else {
            console.log(error);
            alert("오류가 발생했습니다.");
          }
        });
    } else {
      alert("이메일과 비밀번호를 모두 입력하세요.");
    }
  };

  return (
    <div className="login-page">
      <div className="sketchbook-container">
        <img src={ring} alt="스케치북링" className="ring" />
        <div className="service-text">
          병원 일정관리는
          <br /> 도캘과 함께&nbsp;
          <img src={doB} alt="도비 아이콘" />
        </div>

        <div className="login-form">
          <input
            type="email"
            placeholder="이메일을 입력하세요."
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="비밀번호를 입력하세요."
            value={userPwd}
            onChange={(e) => setUserPwd(e.target.value)}
          />
          <button onClick={handleLogin} className="loginBtn">
            로그인
          </button>
          <div className="add-functions">
            <div onClick={handleJoin}>회원가입</div>
            {/* <div onClick={handleSetPassword}>비밀번호 재설정</div> */}
          </div>
        </div>

        <div className="icons-container">
          <div className="speech-bubble">
            <img src={round_rect} alt="말풍선" />
            <span className="speech-text">
              도와줘 캘린더의 <br /> 도비가 도와줄게!
            </span>
          </div>
          <img src={calendar} alt="달력" className="calendar" />
          <img src={cat} alt="도비" className="cat" />
          <img src={turtle} alt="거북이" className="turtle" />
          <img src={crow} alt="까마귀" className="crow" />
        </div>

        <div className="svg-container">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 130"
            fill="none"
          >
            <path
              d="M818.95 72.6085C815.901 60.6125 468.866 -84.5889 0 72.6085V151.582H1440V35.1211C1368.47 -9.20148 1268.95 84.6046 1268.95 84.6046C1268.95 84.6046 1142.54 23.5813 1052 16.0813C961.464 8.5813 822 84.6046 818.95 72.6085Z"
              fill="#EFFDFB"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
