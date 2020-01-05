import "./styles.scss";
import React, { useEffect, useContext } from "react";
import { connect } from "react-redux";
import { AuthContext } from "../../providers/Auth";
import firebase from '../../firebase';

import {
  addLetterStart,
  addLetterEnd,
  shuffleLetters,
  addWord,
  fetchWords,
  fetchComments,
  setProject,
  addUserToTeam
} from "../../actions";
import Adder from "./adder";
import CurrentWord from "./currentWord";
import SingleWord from "./singleWord";

const Shuffler = ({
  saved,
  projects,
  currentProject,
  word,
  addWord,
  addLetterStart,
  addLetterEnd,
  shuffleLetters,
  fetchWords,
  fetchComments,
  setProject,
  addUserToTeam,
  match
}) => {
  const { currentProfile } = useContext(AuthContext);

  useEffect(() => {
    if (currentProject.id !== undefined && currentProject.id !== "") {
      fetchWords(currentProject.id);
      fetchComments(currentProject.id);
    }

    var found = false;
    for (var i = 0; i < projects.length; i++) {
      if (projects[i].id === match.params.id) {
        found = true;
        break;
      }
    }

    if (found) {
      projects.map(proj => {
        if (proj.id !== currentProject.id && proj.id === match.params.id) {
          setProject(proj);
        }
      });
    } else {
      switch (true) {
        case currentProfile.uid !== undefined && match.params.id !== undefined:
          addUserToTeam(currentProfile.uid, match.params.id);
        // case currentProfile.uid === undefined && match.params.id !== undefined:
        //   alert("Please log in to view this project");
      }
      // if (currentProfile.uid !== undefined && match.params.id !== undefined) {
      //   addUserToTeam(currentProfile.uid, match.params.id);
      // }
    }
  }, [currentProject, projects, currentProfile]);

  const handleKeep = () => {
    firebase.analytics().logEvent('name saved');

    if (currentProfile !== null) {
      if (currentProject.id !== undefined) {
        if (!saved.includes(word)) {
          //because words are now objects this doesn't work anymore
          let joinedWord = [];
          word.map(letter => {
            joinedWord.push(letter.letter);
          });
          joinedWord.join("");
          addWord(joinedWord.join(""), currentProject.id);
        }
      } else {
        alert("To save ideas please choose a project");
      }
    } else {
      alert("To save ideas, quickly sign up");
    }
  };

  const renderList = () => {
    if (saved.length !== 0) {
      return (
        <div className="saved-items">
          {saved
            .sort((a, b) =>
              a.total_score < b.total_score
                ? 1
                : a.total_score === b.total_score
                ? a.title > b.title
                  ? 1
                  : -1
                : -1
            )
            .map(savedWord => {
              return <SingleWord savedWord={savedWord} key={savedWord.id} />;
            })}
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <div className="shuffler">
      <div className="shuffler__word">
        <Adder onClick={() => addLetterStart()} />
        <CurrentWord />
        <Adder onClick={() => addLetterEnd()} />
      </div>
      <div className="shuffler__buttons">
        <div className="shuffler__button" onClick={() => shuffleLetters()}>
          <p>Shuffle</p>
        </div>

        <div className="shuffler__button" onClick={handleKeep}>
          <p>Keep</p>
        </div>
      </div>
      {renderList()}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    word: state.word,
    saved: state.saved,
    projects: state.projects,
    currentProject: state.currentProject
  };
};

export default connect(mapStateToProps, {
  addLetterStart,
  addLetterEnd,
  shuffleLetters,
  addWord,
  fetchWords,
  fetchComments,
  setProject,
  addUserToTeam
})(Shuffler);
