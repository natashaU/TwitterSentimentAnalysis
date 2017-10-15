import React, { Component } from 'react';

import {Link} from 'react-router-dom';

class InputForm extends Component {

  render() {
    return (
      <div className="saveForm">
      <form
        className="inputformula"
        onSubmit={this.props.handleInputFormSubmit}
      >

         <input className ="inputformula"
          type="name"
          value={this.props.inputTwitterHandleValue}
          name="twitter handle"
          placeholder="Twitter Handle"
          onChange={this.props.handleInputTwitterHandleChange}
        /><br/>

         <textarea  rows="4" cols="50"
          className="message"
          type="text"
          value={this.props.inputNegativeValue}
          name="negative"
          placeholder="Negative Words"
          onChange={this.props.handleInputNegativeChange}
        /><br/>

        <button id="submit" className="btnform">Save!</button>
        <Link className="btnform" to={`/twitterhandles`}>List</Link>
      </form>
    </div>
    );
  }
}

export default InputForm;



