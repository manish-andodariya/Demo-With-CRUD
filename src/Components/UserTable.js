import React from "react";
import { FaPencilAlt } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";

const UserTable = (props) => {
  return (
    <table className="table-display">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email Address</th>
          <th>Phone</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {props.users.length > 0 ? (
          props.users.map((user) => {
            const { id, name, emailAddress, phone } = user;
            return (
              <tr>
                <td>{name}</td>
                <td>{emailAddress}</td>
                <td>{phone}</td>
                <td className="action-btn">
                  <button
                    className="edit-btn"
                    onClick={() => props.editUser(id, user)}
                  >
                    <FaPencilAlt />
                  </button>
                  <button
                    className="dlt-btn"
                    onClick={() => props.deleteUser(id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td colSpan={4} className="not-found">
              No users found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default UserTable;
