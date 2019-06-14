import React, { Component } from "react";

class Comment extends Component {
  constructor(props) {
    super(props);
    this.inputElementRef = React.createRef();
  }
  render() {
    return (
      <div key={this.props.id}>
        <p className="title">Comment</p>
        Post_ID:{this.props.post_id}
        <br /> User_ID:{this.props.user_id}
        <br />
        Body:{this.props.body}
        <br />
        Publish_date:{this.props.publish_date}
        <br />
        <button onClick={this.props.click} className="button is-danger">Delete</button>
        <br />
        <br />
      </div>
    );
  }
}

export default Comment;
