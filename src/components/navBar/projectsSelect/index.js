import "./styles.scss";
import React, { useContext } from "react";
import { connect } from "react-redux";
import { AuthContext } from "../../../providers/Auth";

const ProjectsSelect = props => {
  const { currentUser } = useContext(AuthContext);

  return (
    <>
      {currentUser !== null ? (
        <a href="#project-browser" className="project__select">
          {props.currentProject.title !== undefined ? props.currentProject.title : "Choose project"}
        </a>
      ) : (
        <p className="project__empty">Log in to save your brand ideas</p>
      )}
    </>
  );
};

const mapStateToProps = state => {
  return { currentProject: state.currentProject };
};

export default connect(mapStateToProps)(ProjectsSelect);
