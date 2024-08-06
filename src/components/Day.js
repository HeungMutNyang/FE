import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "../styles/Day.css";
import fstamp from "../assets/img/finish_stamp.png";
import axios from "axios";
import Modal from "./Modal2.js";

export default function Day({ day, currentMonth, isToday, data }) {
  const [clicked, setClicked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation(); // 현재 경로를 가져옴
  const handleClick = () => {
    if (location.pathname === "/stamp") {
      setClicked(!clicked);
      axios
        .put(
          `${process.env.REACT_APP_API_BASE_URL}/schedule/complete`,
          {
            id: localStorage.getItem("email"),
            done: true,
            scheduleDateTime: day,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
            },
          }
        )
        .then((response) => {
          console.log(response);
        })
        .catch((Error) => {
          console.log(Error);
        });
    } else if (location.pathname === "/") {
      setIsModalOpen(true);
    }
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div
      className={`day-box ${currentMonth ? "current" : "not-current"} ${
        isToday ? "today" : ""
      }`}
      onClick={handleClick}
    >
      <div className="day">{day}</div>
      {location.pathname === "/stamp" && clicked ? (
        <img src={fstamp} width="50%" className="stamp" alt="완료 스탬프" />
      ) : (
        <>
          {data && (
            <>
              {data.schedule && data.schedule.length > 0 && (
                <div>
                  {data.done.length > 0 ? (
                    <img
                      src={fstamp}
                      width="50%"
                      className="stamp"
                      alt="완료 스탬프"
                    />
                  ) : (
                    <div className="todo">{data.schedule[0].todo}</div>
                  )}
                </div>
              )}
            </>
          )}
        </>
      )}
      {
        //일정이 있을 경우
        /*<div className=
        "todo"></div>*/
      }
      <Modal isOpen={isModalOpen} onClose={closeModal} day={day} data={data} />
    </div>
  );
}
