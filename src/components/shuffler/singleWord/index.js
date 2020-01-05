import "./styles.scss";
import React, { useContext, useState } from "react";
import { connect } from "react-redux";
import SingleComment from "../singleComment";
import firebase from "../../../firebase";
import { AuthContext } from "../../../providers/Auth";
import { addComment, removeWord, voteOnWord } from "../.././../actions";

const SingleWord = props => {
  const { currentProfile } = useContext(AuthContext);
  const [word, setWord] = useState(props.savedWord);
  const [comment, setComment] = useState("");

  const compare = (a, b) => {
    if (a.timestamp.seconds > b.timestamp.seconds) return 1;
    if (b.timestamp.seconds > a.timestamp.seconds) return -1;

    return 0;
  };

  const renderComments = comments => {
    if (comments.length !== 0) {
      return props.comments.sort(compare).map(comment => {
        if (comment.word === word.title) {
          return <SingleComment comment={comment} key={comment.id} />;
        } else {
          return null;
        }
      });
    }
  };

  const handleInputChange = e => {
    setComment(e.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    props.addComment(
      props.currentProject.id,
      word.title,
      comment,
      currentProfile.uid,
      currentProfile.name,
      currentProfile.image,
      setComment
    );
  };

  return (
    <div>
      <div className="saved-items__item-container">
        <div className="saved-items__item">{word.title}</div>

        <a
          rel="noopener noreferrer"
          href={`https://www.namecheap.com/domains/registration/results.aspx?domain=${word.title}`}
          target="_blank"
        >
          <div onClick={() => firebase.analytics().logEvent("name saved")}>
            Check Domain
          </div>
        </a>

        {word.score_items[currentProfile.uid] === -1 ? (
          <i className="big angle down icon saved-items__icon--active"></i>
        ) : (
          <i
            className="big angle down icon saved-items__icon"
            onClick={() =>
              props.voteOnWord(
                word,
                -1,
                currentProfile.uid,
                props.currentProject.team.length,
                setWord
              )
            }
          ></i>
        )}

        <p className="saved-items__vote-count">{word.total_score}</p>

        {word.score_items[currentProfile.uid] === 1 ? (
          <i className="big angle up icon saved-items__icon--active"></i>
        ) : (
          <i
            className="big angle up icon saved-items__icon"
            onClick={() =>
              props.voteOnWord(
                word,
                1,
                currentProfile.uid,
                props.currentProject.team.length,
                setWord
              )
            }
          ></i>
        )}
      </div>
      <div className="saved-items__item-comments-container">
        <form
          className="ui reply form saved-items__comment-form"
          onSubmit={handleSubmit}
        >
          <input
            className="saved-items__comment-input"
            placeholder="Comment on this name"
            value={comment}
            onChange={handleInputChange}
          />
          <button className="ui blue labeled submit icon button saved-items__comment-submit">
            <i className="icon edit"></i> Add Reply
          </button>
        </form>

        <div className="saved-items__comments">
          {renderComments(props.comments)}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    comments: state.comments,
    currentProject: state.currentProject
  };
};

export default connect(mapStateToProps, { addComment, removeWord, voteOnWord })(
  SingleWord
);
