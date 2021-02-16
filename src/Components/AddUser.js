import React, { useState } from "react";

const AddUser = (props) => {
    const initUser = { id: null, name: "", emailAddress: "", phone: "" };
    const [user, setUser] = useState(initUser);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (user.name && user.emailAddress && user.phone) {
            handleChange(e, props.addUser(user))
            setUser(initUser)
        }
    }

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
            <button className="btn" type="submit" onClick={handleSubmit}>Save
      </button>
        </form>
    );
};

export default AddUser;
