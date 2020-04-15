import React, { Component } from 'react';


class Question extends Component {
  render() {
    return (
      <div className="row">
        Question {this.props.type}
      </div>
    )
  }
}


export default Question;