import "./styles.scss";
import { connect } from "react-redux";
import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../providers/Auth";
import firebase from "../../../firebase";
import { updateUser, uploadPhoto } from "../../../actions";

const EditUser = props => {
  const { currentProfile } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [imageObj, setImageObj] = useState({
    image: null,
    url: "",
    progress: 0
  });
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    if (currentProfile !== undefined) {
      setName(currentProfile.name);
    }
  }, [currentProfile, imageObj]);

  const handleImageChange = e => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      setSelectedImage(URL.createObjectURL(image));
      setImageObj({ image });
    }
  };

  const handleSave = () => {
    switch (true) {
      case imageObj.image !== null:
        console.log("case 1");
        props.uploadPhoto(
          name,
          imageObj.image,
          currentProfile.uid,
          setImageObj
        );
        break;
      case currentProfile.name !== name:
        props.updateUser(name, currentProfile.image, currentProfile.uid);
        break;
      default:
        window.location.hash = "";
        break;
    }
  };

  return (
    <div className="edit-user" id="edit-user">
      <a href="#" className="edit-user__close">
        ✖
      </a>
      <div className="edit-user__container">
        {currentProfile ? (
          <img
            className="edit-user__avatar"
            src={
              currentProfile.image ||
              selectedImage ||
              "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
            }
          />
        ) : (
          <img
            className="edit-user__avatar"
            src={
              "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
            }
          />
        )}

        {imageObj.progress !== 100 && imageObj.image !== null ? (
          <div className="edit-user__ready">Ready to upload</div>
        ) : (
          <progress
            className="edit-user__progress"
            value={imageObj.progress}
            max="100"
          />
        )}

        <input
          className="edit-user__upload"
          type="file"
          onChange={handleImageChange}
        ></input>

        <input
          className="edit-user__name"
          placeholder="Name"
          value={name || ""}
          onChange={e => setName(e.target.value)}
        ></input>

        <div className="edit-user__save" onClick={handleSave}>
          Save
        </div>
        <div
          className="edit-user__logout"
          onClick={() => {
            firebase.auth().signOut();
            window.location.hash = "";
          }}
        >
          Logout
        </div>
      </div>
    </div>
  );
};

export default connect(null, { updateUser, uploadPhoto })(EditUser);
