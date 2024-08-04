import React, { useContext } from "react";
import "../styles/Calendar.css";
import Day from "./Day.js";
import { DateContext } from "../DateContext";

export default function Calendar() {
  const { date } = useContext(DateContext);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const today = new Date(date);
  const year = today.getFullYear();
  const month = today.getMonth();
  const todayMonth = monthNames[month];

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();
  const days = [];

  const todayString = `${today.getFullYear()}-${(
    "0" +
    (today.getMonth() + 1)
  ).slice(-2)}-${("0" + today.getDate()).slice(-2)}`;

  //이전 달 날짜
  for (let i = firstDay - 1; i >= 0; i--) {
    days.push({
      day: daysInPrevMonth - i,
      currentMonth: false,
    });
  }

  //현재 달 날짜

  for (let i = 1; i <= daysInMonth; i++) {
    //선택 날짜 판별
    const dateStr = `${year}-${("0" + (month + 1)).slice(-2)}-${("0" + i).slice(
      -2
    )}`;
    days.push({
      day: i,
      currentMonth: true,
      isToday: dateStr === todayString,
    });
  }

  // 다음 달 날짜
  const nextMonthDays = 35 - days.length;
  for (let i = 1; i <= nextMonthDays; i++) {
    days.push({
      day: i,
      currentMonth: false,
    });
  }

  return (
    <div className="calendar-box">
      <div className="month">{todayMonth}</div>
      <div className="days">
        {days.map((dayInfo, index) => (
          <Day
            key={index}
            day={dayInfo.day}
            currentMonth={dayInfo.currentMonth}
            isToday={dayInfo.isToday}
          />
        ))}
      </div>
    </div>
  );
}
