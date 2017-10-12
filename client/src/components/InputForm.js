import React, { Component } from 'react';

class InputForm extends Component {

  render() {
    return (
      <form
        className="add-input-form"
        onSubmit={this.props.handleInputFormSubmit}
      >
        <input
          type="text"
          value={this.props.inputPositiveValue}
          name="positive"
          placeholder="Positive words"
          onChange={this.props.handleInputPositiveChange}
        /><br/>

        <input
          type="text"
          value={this.props.inputNegativeValue}
          name="negative"
          placeholder="Negative words"
          onChange={this.props.handleInputNegativeChange}
        /><br/>

         <input
          type="text"
          value={this.props.inputTwitterHandleValue}
          name="twitter handle"
          placeholder="twitter handle"
          onChange={this.props.handleInputTwitterHandleChange}
        /><br/>

        <button id="submit">Save Info Here!</button>
      </form>
    );
  }
}

export default InputForm;
