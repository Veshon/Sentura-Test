import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const API_URL = "https://8015b5dbc0724d38882ac90397c27649.weavy.io";
const API_TOKEN = "wys_hMWpXdekxcn9Gc8Ioah3azOllzUZ7l3HN9yB";

const App: React.FC = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [userData, setUserData] = useState({ name: "", email: "" });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get(API_URL, {
                headers: { Authorization: `Bearer ${API_TOKEN}` },
            });

            // Log the response to inspect its structure
            console.log("API Response:", response.data);

            // Ensure the response is an array before setting it to state
            if (Array.isArray(response.data)) {
                setUsers(response.data);
            } else {
                console.error("Expected an array but got:", response.data);
                setUsers([]); // Fallback in case of unexpected response format
            }
        } catch (error) {
            console.error("Error fetching users", error);
        }
    };

    const createUser = async () => {
        try {
            const response = await axios.post(API_URL, userData, {
                headers: { Authorization: `Bearer ${API_TOKEN}` },
            });
            setUsers([...users, response.data]);
        } catch (error) {
            console.error("Error creating user", error);
        }
    };

    const deleteUser = async (userId: number) => {
        try {
            await axios.delete(`${API_URL}/${userId}`, {
                headers: { Authorization: `Bearer ${API_TOKEN}` },
            });
            setUsers(users.filter((user) => user.id !== userId));
        } catch (error) {
            console.error("Error deleting user", error);
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
            <ul className="user-list">
                {users.length > 0 ? (
                    users.map((user) => (
                        <li key={user.id} className="user-item">
                            {user.name} - {user.email}
                            <button
                                onClick={() => deleteUser(user.id)}
                                className="btn delete"
                            >
                                Delete
                            </button>
                        </li>
                    ))
                ) : (
                    <li>No users available</li>
                )}
            </ul>
        </div>
    );
};

export default App;
