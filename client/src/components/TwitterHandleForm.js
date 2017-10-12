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
          placeholder="Add Image Link Here"
          onChange={this.props.handleInputTwitterHandleChange}
        />
        <br/>
        <button id="submit">Add Twitter Handle!</button>
      </form>
    );
  }
}

export default TwitterHandleForm;
