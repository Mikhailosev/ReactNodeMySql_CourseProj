import React, { Component } from "react";

class User extends Component {
  constructor(props) {
    super(props);
    this.inputElementRef = React.createRef();
  }
  render() {
    return (
      <div key={this.props.id}>
        <p className="title">User</p>
        ID : {this.props.id}
        <br/>
        First Name:{this.props.first_name}
        <br /> Last Name{this.props.last_name}
        <br />
        Email:{this.props.email}
        <br />
        Password:{this.props.password}
        <br />
        Location{this.props.location} <br /> Dept:{this.props.dept}
        <br />
        Register date:{this.props.register_date}
        <br />
        Age:{this.props.age}
        <br />
        <p>DELETING USER CAUSES ALL THE COMMENTS AND POSTS TO BE DELETED</p>
        <button onClick={this.props.click} className="button is-danger">Delete</button>
        <br />
        <br />
      </div>
    );
  }
}

export default User;
