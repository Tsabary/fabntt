import "./styles.scss";
import React, { useState, useContext } from "react";
import { connect } from "react-redux";
import {newProject} from '../../../actions';


import { AuthContext } from "../../../providers/Auth";

const ProjectForm = props => {
  const { currentProfile } = useContext(AuthContext);
  const [values, setValues] = useState({ title: "", password: "" });

  const handleInputChange = e => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    props.newProject(currentProfile.uid, values.title);
  };

  return (
    <form className="project-form" id="new-project" onSubmit={handleSubmit}>
      <a href="#" className="project-form__close">✖</a>
      <h1 className="project-form__title">Create a new brand</h1>
      <input
        className="project-form__input"
        name="title"
        placeholder="Title"
        onChange={handleInputChange}
      />
      <button className="project-form__button">Create</button>
    </form>
  );
};

export default connect(null, {newProject})(ProjectForm);
