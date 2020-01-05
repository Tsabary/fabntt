import "./styles.scss";
import React from "react";
import ProjectSelect from "./projectsSelect";

const NavBar = () => {
  return (
    <div className="nav-bar">
      {/* <Menu /> */}
      <ProjectSelect />
      {/* <ProjectActions /> */}
    </div>
  );
};

export default NavBar;
