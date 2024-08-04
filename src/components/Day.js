import React from "react";
import "../styles/Day.css";

export default function Day({ day, currentMonth, isToday }) {
  return (
    <div
      className={`day-box ${currentMonth ? "current" : "not-current"} ${
        isToday ? "today" : ""
      }`}
    >
      <div className="day">{day}</div>

      {
        //일정이 있을 경우
        /*<div className="todo"></div>*/
      }
    </div>
  );
}
