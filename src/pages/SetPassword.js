import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate import
import "../styles/SetPassword.css";
import hospital from "../assets/img/hospital.png";
import minicat from "../assets/img/minicat.png";

function SetPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newEmail, setNewEmail] = useState(''); 
  const [message, setMessage] = useState('');
  const [showCodeField, setShowCodeField] = useState(false);
  const navigate = useNavigate(); 

  const handleRequestPasswordReset = async (e) => {
    e.preventDefault();
    if (email === 'user@example.com') {
      setShowCodeField(true);
      setMessage('인증번호를 이메일로 전송했습니다.');
    } else {
      setMessage('등록된 이메일이 아닙니다.');
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    if (code === '123456') {
      setStep(2);
      setNewEmail(email); // 두 번째 단계로 넘어갈 때 새로운 이메일 상태를 설정
      setMessage('인증번호가 일치합니다.');
    } else {
      setMessage('인증번호가 일치하지 않습니다.');
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('비밀번호가 일치하지 않습니다.');
      return;
    }
    // 실제 서버 통신 없이 가짜로 비밀번호 변경 성공 메시지 표시
    setMessage('비밀번호가 성공적으로 재설정되었습니다.');
    navigate('/home');
  };

  return (
    <div className="SetPassword-page">
      <div className="SetPassword-form">
        {step === 1 && (
          <div className="SetPassword-form-container">
            <h2 className="Title1">비밀번호 재설정</h2>
            <div className="form-container">
              <div className="email-container">
                <form onSubmit={handleRequestPasswordReset}>
                    <p2 className="Email">이메일</p2>
                    <input className="email-input"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />

                  <div className="verification-container">
                      <input
                        type="text"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        required
                        disabled={!showCodeField}
                      />

                    <button className="Submit-button" type="submit" onClick={!showCodeField ? handleRequestPasswordReset : handleVerifyCode}>
                      인증하기
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="SetNewPassword-container">
            <h2 className="Title2">비밀번호 재설정</h2>
            <form className="Passwordform" onSubmit={handleResetPassword}>
                <div className="NewPassowrd-container1">
                <p>이메일</p>
                <input className="SetEmail"
                  type="email" // 이 부분을 email로 변경
                  value={newEmail} // 새로운 상태 변수 사용
                  readOnly // 이메일은 읽기 전용으로 설정
                  />
                </div>
                <div className="NewPassowrd-container2">
                <p>새로운 비밀번호</p>
                <input className="NewPassword"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  />
                <input className="NewPassword2"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  />
                <div className="Require-Message">  
                <p>8자 이상이어야 합니다.</p>
                <p>숫자, 특수문자를 모두 포함해야 합니다.</p>
                
                </div>
                <button className="NewBtn" type="submit">비밀번호 변경</button>
                </div>
            </form>
            {message && <p className="message">{message}</p>}
          </div>
        )}

      </div>
      <div className="SetPassword-graphic">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 722 486"
          fill="none"
        >
          <path
            d="M721.5 486C593.5 192 352.5 151.5 0 128.5V0H722L721.5 486Z"
            fill="#FBFFDD"
          />
        </svg>
        <img src={minicat} alt="고양이" className="minicat" />
        <img src={hospital} alt="병원" className="hospital" />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="722"
          height="116"
          viewBox="0 0 722 116"
          fill="none"
        >
          <path
            d="M410.613 55.5647C409.083 46.3845 235.084 -64.7329 0 55.5647V116H722V26.8769C686.133 -7.04156 636.238 64.7448 636.238 64.7448C636.238 64.7448 572.855 18.0459 527.461 12.3064C482.067 6.56696 412.142 64.7448 410.613 55.5647Z"
            fill="#EFFDFB"
          />
        </svg>
      </div>
    </div>
  );
}

export default SetPassword;
