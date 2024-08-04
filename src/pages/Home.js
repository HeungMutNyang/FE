import React, { useState, useEffect } from "react";
import Menu from "../components/Menu.js";
import Calendar from "../components/Calendar.js";
import Memo from "../components/Memo.js";
import "../styles/Home.css";
import cloud from "../assets/img/cloud2.png";
import doB from "../assets/img/advice.png";
import round_rect from "../assets/img/round_rect3.png";

export default function Home() {
  const [displayedText, setDisplayedText] = useState("");
  const fullText = "내일 종합건강검진이 있습니다. OOO내과에 내원하세요!";

  useEffect(() => {
    let currentText = "";
    let index = 0;

    const intervalId = setInterval(() => {
      currentText += fullText[index];
      setDisplayedText(currentText);
      index++;

      if (index === fullText.length) {
        clearInterval(intervalId);
      }
    }, 100);

    return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 interval 정리
  }, []);

  return (
    <div className="home-page">
      <Menu />
      <div className="main-box">
        <div className="left-box">
          <div className="date">
            <Calendar />
          </div>
          <div className="fail">
            <h3>이번 달에 달성하지 못한 것</h3>
            <ol>
              <li>7월 4일, 서울성모병원, 내시경검사</li>
              <li>7월 5일, 가톨릭대학교, 가영이와 만나기</li>
              <li>아직 없어요!</li>
            </ol>
            <img src={cloud} alt="뭉게뭉게" width="100%" />
          </div>
        </div>
        <div className="right-box">
          <div className="memo">
            <Memo />
          </div>
          <div className="advice-box">
            <img src={round_rect} alt="말풍선" className="text" />
            <div className="advice">{displayedText}</div>
            <img src={doB} alt="도비" className="doB" />
          </div>
        </div>
      </div>
    </div>
  );
}
