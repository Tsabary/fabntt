import "./styles.scss";
import React from "react";
import { Link } from "react-router-dom";


const Menu = () => {

  return (
    <ul className="menu">
      <li className="menu__item">
        <Link className="menu__link" to="/">
          Shuffler
        </Link>
      </li>
      <li className="menu__item">
        <Link className="menu__link" to="/dictionary">
          Dictionary
        </Link>
      </li>
      <li className="menu__item">
        <Link className="menu__link" to="/translator">
          Translator
        </Link>
      </li>
      <li className="menu__item">
        <Link className="menu__link" to="/mind-map">
          Mind Map
        </Link>
      </li>
    </ul>
  );
};

export default Menu;
