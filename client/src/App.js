import React, { Component } from "react";
import Users from "./components/Users/Users";
import "bulma/css/bulma.css";
import Comments from "./components/Comments/Comments";
import Posts from "./components/Posts/Posts";
class App extends Component {
  constructor(props) {
    super(props);
    console.log("[App.js] constructor");
  }

  state = {
    users: [],
    user: {
      first_name: null,
      last_name: null,
      email: null,
      password: null,
      location: null,
      dept: null,
      is_admin: null,
      register_date: null,
      age: null,
    },
    showUsers: false,
    showPosts: false,
    showComments: false,
    posts: [],
    comments: [],
    post: {
      user_id: null,
      title: null,
      body: null,
    },
    comment: {
      post_id: null,
      user_id: null,
      body: null,
    },
  };

  componentDidMount() {
    this.getUsers();
    this.getComments();
    this.getPosts();
  }
  getUsers = _ => {
    fetch("/users")
      .then(response => response.json())
      .then(response => this.setState({ users: response.data }))
      .catch(err => console.error(err));
  };
  getPosts = _ => {
    fetch("/posts")
      .then(response => response.json())
      .then(response => this.setState({ posts: response.data }))
      .catch(err => console.error(err));
  };
  getComments = _ => {
    fetch("/comments")
      .then(response => response.json())
      .then(response => this.setState({ comments: response.data }))
      .catch(err => console.error(err));
  };

  toggleUsersHandler = () => {
    const doesShow = this.state.showUsers;
    this.setState({ showUsers: !doesShow });
    this.getUsers()
  };
  toggleCommentsHandler = () => {
    const doesShow = this.state.showComments;
    this.setState({ showComments: !doesShow });
  };
  togglePostsHandler = () => {
    const doesShow = this.state.showPosts;
    this.setState({ showPosts: !doesShow });
  };
  addUser = _ => {
    const { user } = this.state;
    fetch(
      `/users/add?first_name=${user.first_name}&last_name=${
        user.last_name
      }&email=${user.email}&password=${user.password}&location=${
        user.location
      }&dept=${user.dept}&is_admin=${user.is_admin}&register_date=${new Date()
        .toISOString()
        .slice(0, 19)
        .replace("T", " ")}&age=${user.age}`
    ).then(this.getUsers).then(this.getComments).then(this.getPosts);
  };
  addComment = _ => {
    const { comment } = this.state;
    fetch(
      `/comments/add?post_id=${comment.post_id}&user_id=${
        comment.user_id
      }&body=${comment.body}&publish_date=${new Date()
        .toISOString()
        .slice(0, 19)
        .replace("T", " ")}`
    ).then(this.getComments);
  };
  addPost = _ => {
    const { post } = this.state;
    fetch(
      `/posts/add?user_id=${post.user_id}&title=${post.title}&body=${
        post.body
      }&publish_date=${new Date()
        .toISOString()
        .slice(0, 19)
        .replace("T", " ")}`
    ).then(this.getPosts);
  };

  deleteUserHandler = (userIndex,id) => {
    fetch(
      `/delete/user?id=${id}`
      ).then(this.getUsers()).then(this.getComments()).then(this.getPosts());
      const users = [...this.state.users];
    users.splice(userIndex, 1);
    this.setState({ users: users });
  };
  deleteCommentHandler = (commentIndex, id) => {
    fetch(
      `/delete/comment?id=${id}`
    ).then(this.getUsers()).then(this.getComments()).then(this.getPosts());
    // const persons = this.state.persons.slice();
    const comments = [...this.state.comments];
    comments.splice(commentIndex, 1);
    this.setState({ commentss: comments });
  };
  deletePostHandler = (postIndex, id) => {
    fetch(
      `/delete/post?id=${id}`
      ).then(this.getUsers()).then(this.getComments()).then(this.getPosts());
      // const persons = this.state.persons.slice();
    const posts = [...this.state.posts];
    posts.splice(postIndex, 1);
    this.setState({ posts:posts});
  };

  renderPost = ({ id, user_id, title, body, publish_date }) => {
    if (this.state.showPosts === true) {
      return (
        <Posts
          key={this.getRandomInt(1000000, 1)}
          id={id}
          className="is-success"
          user_id={user_id}
          body={body}
          title={title}
          publish_date={publish_date}
        />
      );
    }
  };
  getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };
  render() {
    let users = null;
    let posts = null;
    let comments = null;
    if (this.state.showUsers) {
      users = (
        <Users
          key={this.getRandomInt(1000000, 1)}
          clicked={this.deleteUserHandler}
          users={this.state.users}
        />
      );
    }
      if (this.state.showPosts) {
        posts = (
          <Posts
            key={this.getRandomInt(1000000, 1)}
            clicked={this.deletePostHandler}
            posts={this.state.posts}
          />
        );
      }
      if (this.state.showComments) {
        comments = (
          <Comments
            key={this.getRandomInt(1000000, 1)}
            clicked={this.deleteCommentHandler}
            comments={this.state.comments}
          />
        );  
      }
    
    const { user, comment, post } = this.state;
    return (
      <div>
        <div class="field">
          <label className="label">Request tester</label>
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="Enter MySQL request"
            />
          </div>
        </div>
        <div className="section">
          <div className="row columns">
            <div className="column is-one-third">
              <div className="card-large">
                <div className="card-content">
                  <button
                    onClick={this.toggleUsersHandler}
                    className="button is-primary"
                  >
                    Show Users
                  </button>
                  {users}
                  {this.state.showUsers ? (
                    <div>
                      <input
                        placeholder="please enter First Name"
                        onChange={e =>
                          this.setState({
                            user: { ...user, first_name: e.target.value },
                          })
                        }
                        value={this.state.user.first_name}
                      />
                      <input
                        placeholder="please enter Last Name"
                        onChange={e =>
                          this.setState({
                            user: { ...user, last_name: e.target.value },
                          })
                        }
                        value={this.state.user.last_name}
                      />
                      <input
                        placeholder="please enter Email"
                        type="email"
                        onChange={e =>
                          this.setState({
                            user: { ...user, email: e.target.value },
                          })
                        }
                        value={this.state.user.email}
                      />
                      <input
                        placeholder="please enter Password"
                        type="password"
                        onChange={e =>
                          this.setState({
                            user: { ...user, password: e.target.value },
                          })
                        }
                        value={this.state.user.password}
                      />
                      <input
                        placeholder="please enter Location"
                        onChange={e =>
                          this.setState({
                            user: { ...user, location: e.target.value },
                          })
                        }
                        value={this.state.user.location}
                      />
                      <select
                        className="input"
                        name="is_admin"
                        id="dept"
                        type="text"
                        onChange={e =>
                          this.setState({
                            user: { ...user, is_admin: e.target.value },
                          })
                        }
                        value={this.state.user.is_admin}
                      >
                        <option value="0">0</option>
                        <option value="1">1</option>
                      </select>
                      <select
                        className="input"
                        name="dept"
                        id="dept"
                        type="text"
                        onChange={e =>
                          this.setState({
                            user: { ...user, dept: e.target.value },
                          })
                        }
                        value={this.state.user.dept}
                      >
                        <option value="sales">sales</option>
                        <option value="development">development</option>
                        <option value="design">design</option>
                      </select>
                      <input
                        placeholder="please enter age"
                        onChange={e =>
                          this.setState({
                            user: { ...user, age: e.target.value },
                          })
                        }
                        value={this.state.user.age}
                      />

                      <button
                        onClick={this.addUser}
                        className="button is-primary"
                      >
                        Add user
                      </button>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="column is-one-third">
              <div className="card-large">
                <div className="card-content">
                  <button
                    onClick={this.toggleCommentsHandler}
                    className="button is-primary"
                  >
                    Show Comments
                  </button>
                  {comments}
                  {this.state.showComments ? (
                    <div>
                      <input
                        type="number"
                        placeholder="please enter POST_ID"
                        onChange={e =>
                          this.setState({
                            comment: { ...comment, post_id: e.target.value },
                          })
                        }
                        value={this.state.user.post_id}
                      />
                      <input
                        type="number"
                        placeholder="please enter USER_ID"
                        onChange={e =>
                          this.setState({
                            comment: { ...comment, user_id: e.target.value },
                          })
                        }
                        value={this.state.user.user_id}
                      />
                      <input
                        placeholder="please enter BODY of comment"
                        type="text"
                        onChange={e =>
                          this.setState({
                            comment: { ...comment, body: e.target.value },
                          })
                        }
                        value={this.state.user.body}
                      />

                      <button
                        className="button is-primary"
                        onClick={this.addComment}
                      >
                        Add Comment
                      </button>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="column is-one-third">
              <div className="card-large">
                <div className="card-content">
                  <button
                    className="button is-primary"
                    onClick={this.togglePostsHandler}
                  >
                    Show Posts
                  </button>
                  {posts}
                  {this.state.showPosts ? (
                    <div>
                      <input
                        type="number"
                        placeholder="please enter USER_ID"
                        onChange={e =>
                          this.setState({
                            post: { ...post, user_id: e.target.value },
                          })
                        }
                        value={this.state.user.user_id}
                      />
                      <input
                        type="text"
                        placeholder="please enter Title"
                        onChange={e =>
                          this.setState({
                            post: { ...post, title: e.target.value },
                          })
                        }
                        value={this.state.user.title}
                      />
                      <input
                        placeholder="please enter Body"
                        type="text"
                        onChange={e =>
                          this.setState({
                            post: { ...post, body: e.target.value },
                          })
                        }
                        value={this.state.user.body}
                      />

                      <button className="button is-primary" onClick={this.addPost}>
                        Add Post
                      </button>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
