import React, { useState } from "react";
import "../styles/Memo.css";

const Memo = () => {
  const [content, setContent] = useState("");

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  return (
    <div className="memo-container">
      <div className="memo-title">Memo</div>
      <textarea
        className="memo-content"
        value={content}
        onChange={handleChange}
      />
    </div>
  );
};

export default Memo;
