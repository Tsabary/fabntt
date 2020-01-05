import "./styles.scss";
import React, { useContext } from "react";
import { AuthContext } from "../../providers/Auth";
import SignUp from "./signUp";
import LoggedInUser from "./loggedInBox";
import ProjectSelect from "../navBar/projectsSelect";

const Header = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="header">
      <p className="header__logo">FABNTT</p>
       <div className="header__auth">
        {!!currentUser ? <LoggedInUser /> : <SignUp />}
      </div>
      <div className="header__select">
              <ProjectSelect /> 
      </div>

    </div>
  );
};

export default Header;
