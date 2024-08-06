import React, { useState, useEffect, useContext } from "react";
import Menu from "../components/Menu.js";
import Memo from "../components/Memo.js";
import "../styles/Diary.css";
import doB from "../assets/img/advice.png";
import axios from "axios";
import { DateContext } from "../DateContext";
import round_rect from "../assets/img/round_rect3.png";

export default function Diary() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { date } = useContext(DateContext);

  const [displayedText, setDisplayedText] = useState("");
  const fullText = "작성 완료 후 눌러주세요";

  const getCurrentDay = () => {
    const today = new Date(date);
    const day = today.getDate();
    return day;
  };

  const formatDate = (date) => {
    const [year, month, day] = date.split("-");
    return `${year}년 ${month}월 ${day}일`;
  };
  const userId = localStorage.getItem("email");
  const handleFinish = () => {
    const requestBody = {
      id: userId,
      title: title,
      content: content,
      createDate: date,
      updateDate: date,
    };
    const token = localStorage.getItem("ACCESS_TOKEN");
    console.log(requestBody);
    axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/diary`, requestBody, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
        alert("성공적으로 저장했습니다.");
      })
      .catch((error) => {
        console.log(error);
        if (error.response) {
          alert(error.response.data.error);
        } else {
          console.log(error);
          alert("오류가 발생했습니다.");
        }
      });
  };

  const handleSend = () => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/diary`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const data = response.data.data;

        const matchingEntry = data.find((entry) => {
          const entryDate = new Date(entry.createdDate)
            .toISOString()
            .split("T")[0];
          return entryDate === date;
        });

        if (matchingEntry) {
          setTitle(matchingEntry.title);
          setContent(matchingEntry.content);
        } else {
          setTitle(""); // undefined이면 빈 문자열로 설정
          setContent("");
        }
      })
      .catch((Error) => {
        console.log(Error);
      });
  };

  useEffect(() => {
    handleSend();
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
  }, [date]);

  return (
    <div className="diary-page">
      <Menu />
      <div className="main-container">
        <div className="left-container">
          <div className="lefttop-container">
            <div className="date-container">{getCurrentDay()}일</div>
            <div className="title-container">
              <input
                type="text"
                placeholder="일기 제목을 입력하세요."
                className="diary-title-input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <p>{formatDate(date)}의 일기</p>
            </div>
          </div>
          <div className="leftbottom-container">
            <textarea
              placeholder="오늘의 일기를 작성하세요..."
              className="diary-content-input"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>
        </div>
        <div className="right-container">
          <div className="rightmemo-container">
            <Memo />
          </div>
          <div className="dob-container">
            <img src={round_rect} alt="말풍선" className="text" />
            <div className="advice">{displayedText}</div>
            <img src={doB} alt="도비" className="doB" onClick={handleFinish} />
          </div>
        </div>
      </div>
    </div>
  );
}
