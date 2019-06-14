import React, { PureComponent } from "react";
import Post from "./Post/Post";
import "bulma/css/bulma.css";
class Posts extends PureComponent {
  getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };
  render() {
    return this.props.posts.map((post, index) => {
      return (
        <Post
        key={this.getRandomInt(1000000, 1)}
        click={() => this.props.clicked(index, post.id)}
          id={post.id}
          className="is-success"
          user_id={post.user_id}
          body={post.body}
          title={post.title}
          publish_date={post.publish_date}
        />
      );
    });
  }
}

export default Posts;
