import {
  FETCH_PROJECTS,
  FETCH_WORDS,
  FETCH_COMMENTS,
  NEW_PROJECT,
  SET_PROJECT,
  ADD_WORD,
  REMOVE_WORD,
  ADD_END,
  ADD_START,
  SHUFFLE,
  LOCK_LETTER,
  REMOVE_LETTER,
  CHANGE_LETTER,
  ADD_COMMENT
} from "./types";
import firebase from "../firebase";

const db = firebase.firestore();

export const fetchProjects = currentUser => async dispatch => {
  const data = await db
    .collection("projects")
    .where("team", "array-contains", `${currentUser.uid}`)
    .get();

  if (data.docs !== undefined) {
    const docsData = [];
    data.docs.map(doc => {
      docsData.push(doc.data());
    });

    dispatch({
      type: FETCH_PROJECTS,
      payload: docsData
    });
  } else {
    dispatch({
      type: FETCH_PROJECTS,
      payload: []
    });
  }
};

export const fetchWords = projectID => async dispatch => {
  const data = await db
    .collection("names")
    .where("project_ID", "==", projectID)
    .orderBy("total_score", "desc")
    .get();

  if (data.docs !== undefined) {
    const docsData = [];
    data.docs.map(doc => {
      docsData.push(doc.data());
    });

    dispatch({
      type: FETCH_WORDS,
      payload: docsData
    });
  } else {
    dispatch({
      type: FETCH_WORDS,
      payload: []
    });
  }
};

export const fetchComments = projectID => async dispatch => {
  const data = await db
    .collection("comments")
    .where("project_ID", "==", projectID)
    .get();

  if (data.docs !== undefined) {
    const docsData = [];
    data.docs.map(doc => {
      docsData.push(doc.data());
    });

    dispatch({
      type: FETCH_COMMENTS,
      payload: docsData
    });
  } else {
    dispatch({
      type: FETCH_COMMENTS,
      payload: []
    });
  }
};

export const newProject = (profileUid, title) => dispatch => {
  const newDoc = db.collection("projects").doc();
  const newProject = {
    id: newDoc.id,
    title: title,
    team: [profileUid]
  };

  newDoc.set(newProject).then((window.location.hash = ""));

  dispatch({
    type: NEW_PROJECT,
    payload: newProject
  });
};

export const setProject = project => {
  return {
    type: SET_PROJECT,
    payload: project
  };
};

export const addUserToTeam = (profileUid, projectId) => () => {
  db.collection("projects")
    .doc(projectId)
    .update({ team: firebase.firestore.FieldValue.arrayUnion(profileUid) })
    .then(() => {
      fetchProjects(profileUid);
    });
};

export const addWord = (word, projectId) => dispatch => {
  const newDoc = db.collection("names").doc();
  const newWord = {
    id: newDoc.id,
    project_ID: `${projectId}`,
    score_items: [],
    title: word,
    total_score: 0
  };

  newDoc.set(newWord).then(() => {
    dispatch({
      type: ADD_WORD,
      payload: newWord
    });
  });
};

export const removeWord = word => {
  return {
    type: REMOVE_WORD,
    payload: word
  };
};

export const voteOnWord = (word, vote, profileUid, teamSize, setWord) => () => {
  console.log(word.total_score);

  const newScoreItems = word.score_items; //map of all votes
  let userFinalVote = vote; //logged in user's vote

  if (newScoreItems[profileUid])
    //if the user has already voted, we merge the old vote with the new one to balance them
    userFinalVote += newScoreItems[profileUid];

  newScoreItems[profileUid] = userFinalVote; // we now set the final vote of the user to the map

  db.collection("names")
    .doc(word.id)
    .set(
      {
        score_items: { [profileUid]: userFinalVote }
      },
      { merge: true }
    )
    .then(() => {
      const newWord = {
        id: word.id,
        project_ID: word.project_ID,
        title: word.title,
        total_score: word.total_score + vote,
        score_items: newScoreItems
      };

      setWord(newWord);
    });
};

export const addLetterStart = () => {
  return {
    type: ADD_START
  };
};

export const addLetterEnd = () => {
  return {
    type: ADD_END
  };
};

export const shuffleLetters = () => {
  return {
    type: SHUFFLE
  };
};

export const lockLetter = letter => {
  return {
    type: LOCK_LETTER,
    payload: letter
  };
};

export const removeLetter = letterPosition => {
  return {
    type: REMOVE_LETTER,
    payload: letterPosition
  };
};

export const changeLetter = letter => {
  return {
    type: CHANGE_LETTER,
    payload: letter
  };
};

export const addComment = (
  projectId,
  word,
  comment,
  profileUid,
  profileName,
  profileImage,
  clearForm
) => dispatch => {
  const newDoc = db.collection("comments").doc();
  const docObject = {
    id: newDoc.id,
    project_ID: projectId,
    word: word,
    content: comment,
    author_uid: profileUid,
    author_name: profileName,
    author_image: profileImage,
    timestamp: new Date()
  };
  newDoc.set(docObject).then(() => {
    clearForm("");
    dispatch({
      type: ADD_COMMENT,
      payload: docObject
    });
  });
};

export const updateUser = (userName, image, profileUid) => {
  db.collection("users")
    .doc(profileUid)
    .update({ name: userName, image: image })
    .then(() => {
      window.location.hash = "";
      window.location.reload();
    });
};

export const uploadPhoto = (userName, image, profileUid, setImageObj) => () => {
  const uploadTask = firebase
    .storage()
    .ref(`images/${profileUid}/profilePic`)
    .put(image);

  uploadTask.on(
    "state_changed",
    snapshot => {
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      setImageObj({ progress });
    },
    error => {
      console.log(error);
    },
    () => {
      firebase
        .storage()
        .ref(`images/${profileUid}`)
        .child("profilePic")
        .getDownloadURL()
        .then(url => {
          updateUser(userName, url, profileUid);
        })
        .catch(err => console.log(err));
    }
  );
};
