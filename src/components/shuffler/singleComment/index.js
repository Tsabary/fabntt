import "./styles.scss";
import React from "react";
import Moment from "react-moment";

const SingleComment = props => {
  return (
    <div className="comment">
      <img
        className="comment__avatar"
        src={props.comment.author_image ||
          "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"}
      />

      <div className="comment__content">
        <div className="comment__title">
          <p className="comment__author">{props.comment.author_name}</p>
          <Moment className="comment__date" fromNow>
            {props.comment.timestamp.seconds !== undefined
              ? props.comment.timestamp.seconds * 1000
              : Date.now()}
          </Moment>
        </div>
        <p className="saved-items__comment-text">{props.comment.content}</p>
      </div>
    </div>
  );
};

export default SingleComment;
