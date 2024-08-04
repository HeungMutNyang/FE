import React, { useEffect, useState } from "react";
import Menu from "../components/Menu.js";
import Calendar from "../components/Calendar.js";
import "../styles/Stamp.css";
import doB from "../assets/img/advice.png";
import round_rect from "../assets/img/round_rect4.png";

export default function Stamp() {
  const [displayedText, setDisplayedText] = useState("");
  const fullText =
    "오늘 목표를 이룬 날을 클릭하면 빨간 도장을 찍을 수 있습니다.";

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

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="stamp-page">
      <Menu />
      <div className="main-box">
        <div className="stamp-calendar">
          <Calendar />
        </div>
        <div className="doB-box">
          <img src={round_rect} alt="말풍선" className="text-box" />
          <div className="text-stamp">{displayedText}</div>
          <img src={doB} alt="도비" className="doB" />
        </div>
      </div>
    </div>
  );
}
