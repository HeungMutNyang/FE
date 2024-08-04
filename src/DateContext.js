import React, { createContext, useState } from "react";

export const DateContext = createContext();

export const DateProvider = ({ children }) => {
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = ("0" + (today.getMonth() + 1)).slice(-2); // 월 2자리
    const day = ("0" + today.getDate()).slice(-2); // 일 2자리
    return `${year}-${month}-${day}`;
  };

  const [date, setDate] = useState(getTodayDate());

  return (
    <DateContext.Provider value={{ date, setDate }}>
      {children}
    </DateContext.Provider>
  );
};
