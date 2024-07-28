import { useState } from "react";
import "../styles/Join.css";
import { useNavigate } from "react-router-dom";
import profile from "../assets/img/profile.png";

// InputFiled 태그 사용자지정
const InputField = ({ label, type, value, onChange, placeholder, onClick }) => {
  return (
    <div className="input-field">
      <label>{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onClick={onClick}
      />
    </div>
  );
};

export default function Join() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userPwd, setUserPwd] = useState("");
  const [rePwd, setRePwd] = useState("");
  const [nickname, setNickname] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const passwordRegex =
    /^(?=.*[0-9])(?=.*[`?!@#$%^&*])[a-zA-Z0-9`?!@#$%^&*]{8,}$/; // 비밀번호 정규표현식

  // 다음으로 버튼 누를시 입력 조건에 따라 경고 문구
  const handleNext = () => {
    if (!userEmail || !userName || !userPwd || !rePwd || !nickname) {
      setAlertMessage("아직 입력하지 않은 항목이 있습니다.");
    } else if (userPwd !== rePwd) {
      setAlertMessage("비밀번호가 일치하지 않습니다.");
    } else if (!passwordRegex.test(userPwd)) {
      setAlertMessage("비밀번호 규칙에 맞지 않습니다.");
    } else {
      setAlertMessage("");
      navigate("/login");
    }
  };

  return (
    <div className="join-page">
      <div className="form-container">
        <form>
          <h2>회원가입</h2>
          <div className="mail-checking">
            <InputField
              label="이메일"
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />
            <button
              className={userEmail ? "button-enabled" : "button-disabled"}
              disabled={!userEmail}
            >
              인증하기
            </button>
          </div>
          <InputField
            label="성명"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <div className="password-checking">
            <InputField
              label="비밀번호"
              type="password"
              value={userPwd}
              onChange={(e) => setUserPwd(e.target.value)}
            />
            <InputField
              label=""
              type="password"
              value={rePwd}
              onChange={(e) => setRePwd(e.target.value)}
              placeholder="비밀번호를 다시 입력하세요."
            />
            <span>
              8자 이상이어야 합니다. <br />
              숫자, 특수문자를 모두 포함해야 합니다.
            </span>
          </div>
          <InputField
            label="닉네임"
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <div className="input-checking">
            <span className="alert-text">{alertMessage}</span>
            <InputField
              label=""
              type="button"
              value="다음으로"
              onClick={handleNext}
            />
          </div>
        </form>
      </div>
      <div className="preview-container">
        <img src={profile} alt="프로필_프리뷰" />
        <span className="nickname">{nickname}</span>
      </div>
    </div>
  );
}
