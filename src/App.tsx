import React, { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid"; // Import the UUID package
import "./App.css";

const API_URL = "https://8015b5dbc0724d38882ac90397c27649.weavy.io";
const API_TOKEN = "wys_hMWpXdekxcn9Gc8Ioah3azOllzUZ7l3HN9yB";

const App: React.FC = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [userData, setUserData] = useState({
        uid: "",
        name: "",
        given_name: "",
        middle_name: "",
        family_name: "",
        nickname: "",
        email: "",
        phone_number: "",
        comment: "",
        picture: "",
        directory: "",
        metadata: "{}",
        tags: "",
    });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get(API_URL, {
                headers: { Authorization: `Bearer ${API_TOKEN}` },
            });

            console.log("API Response:", response.data);

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
        const newUserData = { ...userData, uid: uuidv4() };

        try {
            const response = await axios.post(API_URL, newUserData, {
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    return (
        <div className="container">
            <h1 className="title">Weavy User Management</h1>

            {/* User input fields */}
            <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={userData.name}
                onChange={handleChange}
                className="input"
            />
            <input
                type="text"
                name="given_name"
                placeholder="Given Name"
                value={userData.given_name}
                onChange={handleChange}
                className="input"
            />
            <input
                type="text"
                name="middle_name"
                placeholder="Middle Name"
                value={userData.middle_name}
                onChange={handleChange}
                className="input"
            />
            <input
                type="text"
                name="family_name"
                placeholder="Family Name"
                value={userData.family_name}
                onChange={handleChange}
                className="input"
            />
            <input
                type="text"
                name="nickname"
                placeholder="Nickname"
                value={userData.nickname}
                onChange={handleChange}
                className="input"
            />
            <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={userData.email}
                onChange={handleChange}
                className="input"
            />
            <input
                type="text"
                name="phone_number"
                placeholder="Phone Number"
                value={userData.phone_number}
                onChange={handleChange}
                className="input"
            />
            <input
                type="text"
                name="comment"
                placeholder="Comment"
                value={userData.comment}
                onChange={handleChange}
                className="input"
            />
            <input
                type="text"
                name="picture"
                placeholder="Profile Picture URL"
                value={userData.picture}
                onChange={handleChange}
                className="input"
            />
            <input
                type="text"
                name="directory"
                placeholder="Directory"
                value={userData.directory}
                onChange={handleChange}
                className="input"
            />
            <input
                type="text"
                name="metadata"
                placeholder='Metadata (e.g., {"color": "blue", "size": "XL"})'
                value={userData.metadata}
                onChange={handleChange}
                className="input"
            />
            <input
                type="text"
                name="tags"
                placeholder="Tags (comma separated)"
                value={userData.tags}
                onChange={handleChange}
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
