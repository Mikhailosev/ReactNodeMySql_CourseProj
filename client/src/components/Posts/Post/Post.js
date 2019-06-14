import React, { Component } from "react";

class Post extends Component {
  constructor(props) {
    super(props);
    this.inputElementRef = React.createRef();
  }
  render() {
    return (
<div key={this.props.id}>
<p className="title">Post</p>
POST_ID: {this.props.id}
<br/>
User_ID:{this.props.user_id}
<br /> Title:{this.props.title}
<br />
Body:{this.props.body}
<br />
Publish_date:{this.props.publish_date}
<br />

<button onClick={this.props.click}className="button is-danger">Delete</button>
<br />
<br />
</div>
  );
}
}

export default Post;
