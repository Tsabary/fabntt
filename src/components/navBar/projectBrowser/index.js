import "./styles.scss";
import React, { useContext, useEffect } from "react";
import { connect } from "react-redux";
import { setProject, fetchProjects } from "../../../actions";
import { AuthContext } from "../../../providers/Auth";
import { Link } from "react-router-dom";

const ProjectBrowser = props => {
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (currentUser !== null) {
      if (props.projects.length === 0) {
        props.fetchProjects(currentUser);
      }
    }
  }, [currentUser, props.projects]);

  const handleChoice = project => {
    props.setProject(project);
    window.location.hash = "";
  };

  const renderProjects = () => {
    if (props.projects !== undefined) {
      return props.projects.map(project => {
        return (
          <div className="option" key={project.id}>
            <Link
              to={`/${project.id}`}
              className="option__text"
              onClick={() => handleChoice(project)}
            >
              {project.title}
            </Link>

            {/* <p
              className="option__copy"
              // onClick={() => handleChoice(project)}
            >
              Copy share url
            </p> */}
          </div>
        );
      });
    }
    return null;
  };

  return (
    <div className="project-browser" id="project-browser">
      <a href="#" className="project-browser__close">
        ✖
      </a>
      <div className="project-browser__options">
        <div className="option" key="new-project">
          <a className="option__new" href="#new-project">
            Create a new project
          </a>
        </div>
        {renderProjects()}
      </div>
    </div>
  );
};
const mapStateToProps = state => {
  return {
    projects: state.projects,
    currentProject: state.currentProject
  };
};

export default connect(mapStateToProps, { setProject, fetchProjects })(
  ProjectBrowser
);
