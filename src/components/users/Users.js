import React, { Component } from "react";
import UserItem from "./UserItem";
import Spinner from "./../spinner/Spinner";

export default class Users extends Component {
  render() {
    const { loading, users } = this.props;
    if (loading) {
      return <Spinner />;
    }
    return (
      <div className='container'>
        <div className='row'>
          {users.map(user => (
            <UserItem key={user.id} user={user} />
          ))}
        </div>
      </div>
    );
  }
}
