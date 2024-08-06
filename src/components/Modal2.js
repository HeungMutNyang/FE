import React, { useContext } from "react";
import "../styles/Modal.css";
import { DateContext } from "../DateContext";

export default function Modal2({ isOpen, onClose, day }) {
  const { date, setDate } = useContext(DateContext);
  const year = new Date(date).getFullYear();
  const month = new Date(date).getMonth() + 1;
  const fullDate = `${year}년 ${("0" + month).slice(-2)}월 ${("0" + day).slice(
    -2
  )}일`;
  if (!isOpen) return null;

  return (
    <div className="modal-container" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal">
            <p>{fullDate}</p>
          </div>
          <button className="modal-close" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          {/* {data.schedule && data.schedule.length > 0 && (
            <div>
              <h3>일정:</h3>
              {data.schedule.map((item, index) => (
                <p key={index}>{item.todo}</p>
              ))}
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
}
