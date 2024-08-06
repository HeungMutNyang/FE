import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/MyPage.css";
import hospital from "../assets/img/hospital.png";
import minicat from "../assets/img/minicat.png";
import Menu from "../components/Menu";

export default function My_page() {
  const handleDel = () => {};
  return (
    <div className="SetPassword-page">
      <Menu />
      <div className="SetPassword-graphic">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 722 486"
          fill="none"
        >
          <path
            d="M721.5 486C593.5 192 352.5 151.5 0 128.5V0H722L721.5 486Z"
            fill="#FBFFDD"
          />
        </svg>
        <img src={minicat} alt="고양이" className="minicat" />
        <img src={hospital} alt="병원" className="hospital" />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="722"
          height="116"
          viewBox="0 0 722 116"
          fill="none"
        >
          <path
            d="M410.613 55.5647C409.083 46.3845 235.084 -64.7329 0 55.5647V116H722V26.8769C686.133 -7.04156 636.238 64.7448 636.238 64.7448C636.238 64.7448 572.855 18.0459 527.461 12.3064C482.067 6.56696 412.142 64.7448 410.613 55.5647Z"
            fill="#EFFDFB"
          />
        </svg>
      </div>
      {/* <div className="info_box">
        <div>아이디</div>
        <div>{localStorage.getItem("email")}</div>
        <div>이름</div>
        <div>신장</div>
        <div>몸무게</div>
        <button onClick={handleDel}>탈퇴하기</button>
      </div> */}
    </div>
  );
}
