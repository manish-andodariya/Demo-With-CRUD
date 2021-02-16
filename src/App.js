import "./App.css";
import React, { useState, useEffect } from "react";
import UserTable from "./Components/UserTable";
import AddUser from "./Components/AddUser";
import EditUser from "./Components/EditUser";

function App() {
  const [form, setForm] = useState(false);
  const [users, setUsers] = useState(null);

  const [editing, setEditing] = useState(false);
  const initialUser = { id: null, name: "", emailAddress: "", phone: "" };
  const [currentUser, setCurrentUser] = useState(initialUser);

  const useAsyncRequest = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      const fetchData = async () => {
        try {
          setLoading(true);
          const response = await fetch(`https://demowithcrud.glitch.me/users/`);
          const res = await response.json();
          setData(res, setLoading(false));
          console.log(res);
        } catch (err) {
          console.warn("Something went wrong fetching the API...", err);
          setLoading(false);
        }
      }
      fetchData();
    }, []);

    return [data, loading]
  }

  const handleForm = () => {
    setForm(!form);
  }

  const [data, loading] = useAsyncRequest();
  useEffect(() => {
    if (data) {
      setUsers(data);
    }
  }, [data]);

  const addUser = async (user) => {
    const response = await fetch(`https://demowithcrud.glitch.me/users/`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(user)
    });
    const res = await response.json();
    setUsers([...users, res]);
    console.log(res);
  };

  const deleteUser = async (id) => {
    if (window.confirm("Are you sure you eant to delete?")) {
      const response = await fetch(`https://demowithcrud.glitch.me/users/${id}`, {
        method: 'DELETE'
      });
      setUsers(users.filter((user) => user.id != id));
    }
  };

  const editUser = (id, user) => {
    setEditing(true);
    setCurrentUser(user);
  }
  const updateUser = async (newUser) => {
    const response = await fetch(`https://demowithcrud.glitch.me/users/${currentUser.id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(newUser)
    });
    const res = await response.json();
    setUsers(users.map(user => (user.id === currentUser.id ? res : user)));
    console.log(res);
    setCurrentUser(initialUser);
    setEditing(false);
    // setUsers(users.map(user => (user.id === currentUser.id ? newUser : user)))
  }

  return (
    <div className="container">
      <h1>DEMO WITH CRUD 🔥 </h1>
      <div className="wrapper">
        {form && <div className="form-area">
          {editing ?
            <div>
              <EditUser
                currentUser={currentUser}
                setEditing={setEditing}
                updateUser={updateUser}
              />
            </div>
            : <div>
              <AddUser addUser={addUser} />
            </div>}
        </div>}
        {loading || !users ? (
          <p>Loading...</p>
        ) : (<div className="table-area">
          {!form ? <div className="not-form"><h2>Employee Details</h2><button className="btn btn-toggle" onClick={handleForm}>Add</button></div> : <div className="not-form"><h2>Employee Details</h2><button className="btn btn-toggle" onClick={handleForm}>Close</button></div>}
          <UserTable users={users} deleteUser={deleteUser} editUser={editUser} />
        </div>)}
      </div>
    </div>
  );
}

export default App;
