import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const API_BASE_URL = "https://8015b5dbc0724d38882ac90397c27649.weavy.io";
const API_TOKEN = "wys_hMWpXdekxcn9Gc8Ioah3azOllzUZ7l3HN9yB";

const App: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [userData, setUserData] = useState({ name: "", email: "" });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(API_BASE_URL, {
        headers: { Authorization: `Bearer ${API_TOKEN}` },
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  const createUser = async () => {
    try {
      const response = await axios.post(API_BASE_URL, userData, {
        headers: { Authorization: `Bearer ${API_TOKEN}` },
      });
      setUsers([...users, response.data]);
    } catch (error) {
      console.error("Error creating user", error);
    }
  };



  return (
      <div className="container">
        <h1 className="title">Weavy User Management</h1>
        <input
            type="text"
            placeholder="Name"
            value={userData.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            className="input"
        />
        <input
            type="email"
            placeholder="Email"
            value={userData.email}
            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
            className="input"
        />
        <button onClick={createUser} className="btn create">
          Create User
        </button>
        <h2 className="subtitle">Users List</h2>

      </div>
  );
};

export default App;
