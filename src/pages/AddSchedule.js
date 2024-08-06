import React, { useState, useEffect } from "react";
import "../styles/AddSchedule.css";
import Menu from "../components/Menu.js";
import Calendar from "../components/Calendar.js";
import Modal from "../components/Modal.js";
import doB from "../assets/img/advice.png";
import round_rect from "../assets/img/round_rect4.png";

export default function AddSchedule() {
  const [displayedText, setDisplayedText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fullText = "원하는 날짜를 클릭하면 일정을 추가할 수 있습니다.";

  // useEffect(() => {
  //   let currentText = "";
  //   let index = 0;

  //   const intervalId = setInterval(() => {
  //     currentText += fullText[index];
  //     setDisplayedText(currentText);
  //     index++;

  //     if (index === fullText.length) {
  //       clearInterval(intervalId);
  //     }
  //   }, 100);

  //   return () => clearInterval(intervalId);
  // });

  const handleDateClick = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="add-schedule-page">
      <Menu />
      <div className="main-box">
        <div className="stamp-calendar" onClick={handleDateClick}>
          <Calendar />
        </div>
        <div className="doB-box">
          <img src={round_rect} alt="말풍선" className="text-box" />
          <div className="text-stamp">{displayedText}</div>
          <img src={doB} alt="도비" className="doB" />
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
