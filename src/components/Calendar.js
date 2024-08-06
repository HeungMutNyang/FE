import React, { useContext, useState, useEffect } from "react";
import "../styles/Calendar.css";
import Day from "./Day.js";
import { DateContext } from "../DateContext";
import dayjs from "dayjs";
import axios from "axios";

export default function Calendar() {
  const { date } = useContext(DateContext);
  const [todo, setTodo] = useState({ schedule: [], done: [] });
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

  useEffect(() => {
    console.log(date);
    const fetchSchedule = async () => {
      const token = localStorage.getItem("ACCESS_TOKEN");
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/schedule/date`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              date: todayString,
            },
          }
        );
        setTodo({
          schedule: response.data.data.title,
          done: response.data.data.done,
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchSchedule();
    alert("가져옴");
  }, []);

  //date, year, month, daysInMonth

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
    // const daySchedule = todo.schedule.filter(
    //   (item) => dayjs(item.date).format("YYYY-MM-DD") === dateStr
    // );
    // const dayDone = todo.done.filter(
    //   (item) => dayjs(item.date).format("YYYY-MM-DD") === dateStr
    // );
    // const dayData = {
    //   schedule: daySchedule,
    //   done: dayDone,
    // };
    days.push({
      day: i,
      currentMonth: true,
      isToday: dateStr === todayString,
      // data: dayData,
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
            // data={dayInfo.data}
          />
        ))}
      </div>
    </div>
  );
}
