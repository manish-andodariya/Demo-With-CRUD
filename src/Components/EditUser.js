import React, { useState, useEffect } from "react";

const EditUser = (props) => {
  useEffect(() => {
    setUser(props.currentUser);
  }, [props]);

  const [user, setUser] = useState(props.currentUser);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user.name && user.emailAddress && user.phone) {
      props.updateUser(user);
    }
  };

  return (
    <form>
      <input
        className="txt-input"
        type="text"
        name="name"
        placeholder="Name"
        value={user.name}
        onChange={handleChange}
      />
      <input
        className="txt-input"
        type="text"
        name="emailAddress"
        placeholder="Email Address"
        value={user.emailAddress}
        onChange={handleChange}
      />
      <input
        className="txt-input"
        type="text"
        name="phone"
        placeholder="Phone Number"
        value={user.phone}
        onChange={handleChange}
      />
      <button className="btn" type="submit" onClick={handleSubmit}>
        Edit
      </button>
      <button
        type="submit"
        className="btn"
        onClick={() => props.setEditing(false)}
      >
        Cancel
      </button>
    </form>
  );
};

export default EditUser;
