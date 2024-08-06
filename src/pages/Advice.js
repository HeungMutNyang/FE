import React, { useEffect, useState } from "react";
import Menu from "../components/Menu.js";
import "../styles/Advice.css";
import cloud from "../assets/img/cloud.png";
import doB from "../assets/img/advice.png";
import axios from "axios";

export default function Advice() {
  const [displayedText, setDisplayedText] = useState("");
  const [fullText, setFullText] = useState(
    "오늘은 날이 좋으니 조금 걸어보도록 하세요!"
  );

  useEffect(() => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/advice`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        setFullText(response.data.data);
        // const data = response.data.data;
        // setDisplayedText(data);
      })
      .catch((Error) => {
        console.log(Error);
      });

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
    <div className="advice-page">
      <Menu />
      <div className="image-container">
        <img src={cloud} alt="뭉게뭉게" className="cloud" />
        <img src={doB} alt="조언도비" className="doB" />
        <div className="textBox">{displayedText}</div>
      </div>
    </div>
  );
}
