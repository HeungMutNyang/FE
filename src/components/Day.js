import React, { useState, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../styles/Day.css";
import fstamp from "../assets/img/finish_stamp.png";
import axios from "axios";
import Modal from "./Modal2.js";
import { DateContext } from "../DateContext";

export default function Day({ day, currentMonth, isToday }) {
  const [clicked, setClicked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation(); // 현재 경로를 가져옴
  const [data, setData] = useState([]);
  const { date, setDate } = useContext(DateContext);
  const year = new Date(date).getFullYear();
  const month = new Date(date).getMonth() + 1;
  const fullDate = `${year}-${("0" + month).slice(-2)}-${("0" + day).slice(
    -2
  )}`;

  const handleClick = () => {
    if (location.pathname === "/stamp") {
      setClicked(!clicked);
      // axios
      //   .put(
      //     `${process.env.REACT_APP_API_BASE_URL}/schedule/complete`,
      //     {
      //       id: localStorage,
      //       title: data.schedule,
      //       done: true,
      //       scheduleDateTime: day,
      //     },
      //     {
      //       headers: {
      //         Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
      //       },
      //     }
      //   )
      //   .then((response) => {
      //     console.log("스탬프를 찍었습니다.");
      //     console.log(response);
      //   })
      //   .catch((Error) => {
      //     console.log("에러");
      //     console.log(Error);
      //   });
    } else if (location.pathname === "/") {
      setIsModalOpen(true);
    }
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("ACCESS_TOKEN");
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/schedule/date`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              date: fullDate,
            },
          }
        );
        setData(response.data.data);
        console.log(response.data.data, day);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [data]);

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
          {data !== null && data.length > 0 && (
            <>
              {data.title && (
                <div>
                  {data.done ? (
                    <img
                      src={fstamp}
                      width="50%"
                      className="stamp"
                      alt="완료 스탬프"
                    />
                  ) : (
                    <div className="todo">{data.title}</div>
                  )}
                </div>
              )}
            </>
          )}
        </>
      )}
      <Modal isOpen={isModalOpen} onClose={closeModal} day={day} />
    </div>
  );
}
