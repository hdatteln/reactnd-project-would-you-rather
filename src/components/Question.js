import React, { Component } from 'react';


class Question extends Component {
  render() {
    const { type, questions } = this.props;

    return (
      <div className="row">

        { questions.map((q) => (

          <div key={q.id} className="card">
            <div className="row card-content">
              <div className="row s12 teal lighten-4">
                <div className="col"><h6><strong>{q.author}</strong> asks:</h6></div>
              </div>
              <div className="row s12">
                <div className="col card-image s4"><img src={q.author_avatar} alt={q.author}/></div>
                <div className="col s8">
                  <strong>Would you rather...</strong>
                  <div>{q.optionOne_text}  -OR-  {q.optionTwo_text}&nbsp;?</div>
                  <div className="btnwrap"><button className='btn'> Poll </button></div>
                </div>
              </div>

            </div>

          </div>
        ))}
      </div>
    )
  }
}


export default Question;