import "./styles.scss";
import React, { useContext } from "react";
import { AuthContext } from "../../../providers/Auth";

const LoggedInUser = () => {
  const { currentProfile } = useContext(AuthContext);

  return (
    <div className="logged-in">
      <a href="#edit-user" className="logged-in__avatar">
        {currentProfile ? (
          <img
            className="logged-in__avatar--visible"
            src={
              currentProfile.image ||
              "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
            }
            alt="user avatar"
          />
        ) : (
          <img
            className="logged-in__avatar--visible"
            src={
              "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
            }
            alt="user avatar"
          />
        )}

        <svg className="logged-in__avatar--invisible">
          <use xlinkHref="./sprite.svg#icon-new-message"></use>
        </svg>
      </a>
    </div>
  );
};

export default LoggedInUser;
