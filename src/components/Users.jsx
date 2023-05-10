/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";

const Users = () => {
  const loadedUsers = useLoaderData();
  const [users, setUsers] = useState(loadedUsers);
  // console.log(users);

  const handleDeleteUser = (_id) => {
    // console.log("Delete: ", _id);
    fetch(`http://localhost:5000/users/${_id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.deletedCount === 1) {
          alert("User Delete Successful");
          const remaining = users.filter((user) => user._id !== _id);
          setUsers(remaining);
        }
      });
  };

  return (
    <div>
      <h1>All Users: {users.length}</h1>
      <div>
        {users.map((user) => (
          <p key={user._id}>
            Name: {user.name}, Email: {user.email}{" "}
            <button onClick={() => handleDeleteUser(user._id)}>X</button>
          </p>
        ))}
      </div>
    </div>
  );
};

export default Users;
