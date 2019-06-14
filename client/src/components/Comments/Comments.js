import React, { PureComponent } from "react";
import Comment from "./Comment/Comment";
import "bulma/css/bulma.css";
class Comments extends PureComponent {
  getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };
  render() {
    return this.props.comments.map((comment, index) => {
      return (
        <Comment
          key={this.getRandomInt(1000000, 1)}
          click={() => this.props.clicked(index, comment.id)}
          id={comment.id}
          className="is-success"
          post_id={comment.post_id}
          user_id={comment.user_id}
          body={comment.body}
          publish_date={comment.publish_date}
        />
      );
    });
  }
}

export default Comments;
