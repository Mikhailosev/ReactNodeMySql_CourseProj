import React, { PureComponent } from "react";
import User from "./User/User";
class Users extends PureComponent {
  getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };
  render() {
    return this.props.users.map((user, index) => {
      return (
        <User
          key={this.getRandomInt(1000000, 1)}
          id={user.id}
          click={() => this.props.clicked(index,user.id)}
          first_name={user.first_name}
          last_name={user.last_name}
          email={user.email}
          password={user.password}
          dept={user.dept}
          is_admin={user.is_admin}
          age={user.age}
          location={user.location}
          register_date={user.register_date}
        />
      );
    });
  }
}

export default Users;
