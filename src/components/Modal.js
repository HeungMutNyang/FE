import React from "react";
import "../styles/Modal.css";

export default function Modal({ isOpen, onClose }) {
  if (!isOpen) return null; 

  return (
    <div className="modal-container">
      <div className="modal-content">
        <div className="modal-header">
            <div className="modal"><p>일정 추가</p></div>
            <button className="modal-close" onClick={onClose}>
              &times;
            </button>
        </div>
        

        <div className="when-container"><p>언제</p></div>
        <form className="schedule-form">          
          <label htmlFor="schedule-date">어디서</label>
          <input type="date" id="schedule-where" name="where" required />

          <label htmlFor="schedule-time">누구와</label>
          <input type="time" id="schedule-who" name="who" required />

          <label htmlFor="schedule-details">메모</label>
          <textarea id="schedule-details" name="details" rows="4" />
          
          <div className="last-container"><button type="submit">추가하기</button></div>
        </form>
      </div>
    </div>
  );
}
