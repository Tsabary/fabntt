import "./styles.scss";
import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import Global from "../styles/global";


import Header from "./header";
import Shuffler from "./shuffler";
// import Dictionary from "../components/dictionary";
// import Translator from "../components/translator";
// import MindMap from "../components/mindMap";

import ProjectForm from "./navBar/projectForm";
import ProjectBrowser from "./navBar/projectBrowser";
import EditUser from './header/editUser';
import NavBar from "./navBar";

import history from "../history";
import { AuthProvider } from "../providers/Auth";
import { ProjectProvider } from "../providers/Project";

const App = () => {
  return (
    <AuthProvider>
      <ProjectProvider>
        <Router history={history}>
          <div className="app">
            <Global/>
            <ProjectForm />
            <ProjectBrowser />
            <EditUser/>
            <Header />
            {/* <NavBar /> */}
            <Switch>
              <Route path="/" exact component={Shuffler} />
              <Route path="/:id" exact component={Shuffler} />
              {/* <Route path="/dictionary" exact component={Dictionary} />
              <Route path="/translator" exact component={Translator} />
              <Route path="/mind-map" exact component={MindMap} /> */}
            </Switch>
          </div>
        </Router>
      </ProjectProvider>
    </AuthProvider>
  );
};

export default App;
