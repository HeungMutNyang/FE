import React from "react";
import Menu from "../components/Menu.js";
import Memo from "../components/Memo.js";
import "../styles/Diary.css";
import { useParams } from "react-router-dom";
import doB from "../assets/img/advice.png";

export default function Diary() {
  const { date } = useParams();

  const getCurrentDay = () => {
    const today = new Date();
    const day = today.getDate();
    return day;
  };

  const formatDate = (date) => {
    const [year, month, day] = date.split("-");
    return `${year}년 ${month}월 ${day}일`;
  };

  return (
    <div className="diary-page">
      <Menu />
      <div className="main-container">
        <div className="left-container">
          <div className="lefttop-container">
            <div className="date-container">
              {getCurrentDay()}일
            </div>
            <div className="title-container">
              <input
                type="text"
                placeholder="일기 제목을 입력하세요."
                className="diary-title-input"
              />
              <p>{formatDate(date)}의 일기</p>
            </div>
          </div>
          <div className="leftbottom-container">
            <textarea
              placeholder="오늘의 일기를 작성하세요..."
              className="diary-content-input"
            ></textarea>
          </div>
        </div>
        <div className="right-container">
          <div className="rightmemo-container">
            <Memo />
          </div>
          <div className="dob-container">
            <img src={doB} alt="도비" className="doB" />
          </div>
        </div>
      </div>
    </div>
  );
}
