import React, { useState } from "react";
import "../styles/Modal.css";
import axios from "axios";

export default function Modal({ isOpen, onClose }) {
  const [id, setId] = useState(localStorage.getItem("email"));
  const [title, setTitle] = useState("");
  const [where, setWhere] = useState("");
  const [together, setTogether] = useState("");

  const [done, setDone] = useState(false);
  const [datetime, setDateTime] = useState("");

  if (!isOpen) return null;

  const handleClick = () => {
    const content = `${where}에서${together}와${title}`;
    console.log(content);

    const requestBody = {
      title: content,
      done: false,
      scheduleDateTime: datetime,
    };
    const token = localStorage.getItem("ACCESS_TOKEN");
    console.log(requestBody);
    axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/schedule`, requestBody, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
        alert("성공적으로 추가했습니다.");
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

  return (
    <div className="modal-container">
      <div className="modal-content">
        <div className="modal-header">
          <div className="modal">
            <p>일정 추가</p>
          </div>
          <button className="modal-close" onClick={onClose}>
            &times;
          </button>
        </div>

        <form className="schedule-form">
          <label>언제</label>
          <input
            type="datetime-local"
            id="schedule-where"
            name="where"
            required
            value={datetime}
            onChange={(e) => setDateTime(e.target.value)}
          />
          <label htmlFor="schedule-where">어디서</label>
          <input
            type="text"
            value={where}
            onChange={(e) => setWhere(e.target.value)}
          />
          <label htmlFor="schedule-time">누구와</label>
          <input
            type="text"
            value={together}
            onChange={(e) => setTogether(e.target.value)}
          />

          <label htmlFor="schedule-details">메모</label>
          <textarea
            id="schedule-details"
            name="details"
            rows="4"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <div className="last-container">
            <button onClick={handleClick}>추가하기</button>
          </div>
        </form>
      </div>
    </div>
  );
}
