import "./styles.scss";
import React from "react";

const Adder = ({ onClick }) => {
  return (
    <div className="adder" onClick={onClick}>
      <p>+</p>
    </div>
  );
};

export default Adder;
