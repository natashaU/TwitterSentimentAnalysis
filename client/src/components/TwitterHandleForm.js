import React, { Component } from "react";

class TwitterHandleForm extends Component {
  render() {
    return (
      <form
        className="add-twitter-form"
        onSubmit={this.props.handleTwitterFormSubmit}
      >
      <input
          type="text"
          value={this.props.inputTwitterHandleValue}
          name="content"
          placeholder="Twitter Handle"
          onChange={this.props.handleInputTwitterHandleChange}
        /> <button className="handleBtn">Analyze Twitter Profile!</button>
      </form>
    );
  }
}

export default TwitterHandleForm;
