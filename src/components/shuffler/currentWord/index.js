import "./styles.scss";
import React from "react";
import SingleLetter from "../singleLetter";
import { connect } from "react-redux";

class CurrentWord extends React.Component {
  renderLetters() {
    return this.props.word.map(letter => {
      return (
        <SingleLetter letter={letter} key={Math.floor(Math.random() * 1000000)} />
      );
    });
  }

  render() {
    return <div className="current-word">{this.renderLetters()}</div>;
  }
}

const mapStateToProps = state => {
  return { word: state.word };
};

export default connect(mapStateToProps)(CurrentWord);
