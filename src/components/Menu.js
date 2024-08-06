import React, { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/Menu.css";
import { DateContext } from "../DateContext";
import { useAuth } from "../AuthContext";
import my_doB from "../assets/img/profile.png";

export default function Menu() {
  const { date, setDate } = useContext(DateContext);
  const [dateSet, setDateSet] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const handleDate = () => {
    setDateSet(!dateSet);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
    setDateSet(false); // 날짜 선택 후 선택기 닫기
  };

  const handleDateTextClick = () => {
    if (location.pathname !== "/") {
      navigate("/");
    }
  };

  const formatDate = (date) => {
    const [year, month, day] = date.split("-");
    return `${year}년 ${month}월 ${day}일`;
  };

  const handleDiaryClick = () => {
    navigate(`/diary/${date}`);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="Menu_bar">
      <div className="Menu_items">
        <div>
          <button onClick={handleDate}>날짜 변경</button>
          {!dateSet ? (
            <span onClick={handleDateTextClick}>{formatDate(date)}</span>
          ) : (
            <input type="date" value={date} onChange={handleDateChange} />
          )}
        </div>
        <div onClick={handleDiaryClick}>오늘의 일기</div>
        <div onClick={() => navigate("/add-schedule")}>일정 추가</div>
        <div onClick={() => navigate("/stamp")}>도장찍기</div>
        <div onClick={() => navigate("/advice")}>도비의 조언 듣기</div>
        <div onClick={handleLogout}>로그아웃</div>
        <img
          src={my_doB}
          alt="마이페이지 도비"
          width="80vw"
          height="85vw"
          onClick={() => navigate("/my-page")}
        />
      </div>
    </div>
  );
}
