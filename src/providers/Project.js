import React, { useState } from "react";

export const ProjectContext = React.createContext();

export const ProjectProvider = ({ children }) => {
  const [currentProject, setCurrentProject] = useState({
    id: "",
    password: "",
    team: [],
    title: ""
  });
  const [projects, setProjects] = useState([]);

  return (
    <ProjectContext.Provider
      value={{
        currentProject,
        setCurrentProject,
        projects,
        setProjects
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
