import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Container } from 'react-bootstrap';
import './HomePage.css';

const HomePage = () => {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [formData, setFormData] = useState({ name: '', phone: '', profession: '' });

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/users');
                setUsers(res.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchUsers();
    }, []);

    const handleEditClick = (user) => {
        setEditingUser(user._id);
        setFormData({ name: user.name, phone: user.phone, profession: user.profession });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        try {
            await axios.put(`http://localhost:5000/api/users/${editingUser}`, formData);
            setUsers(users.map((user) => (user._id === editingUser ? { ...user, ...formData } : user)));
            setEditingUser(null);
            alert('User updated successfully');
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/users/${id}`);
            setUsers(users.filter((user) => user._id !== id));
            alert('User deleted successfully');
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    return (
        <Container>
            {/* <h2>Registered Users</h2> */}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Profession</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>
                                {editingUser === user._id ? (
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    user.name
                                )}
                            </td>
                            <td>{user.email}</td>
                            <td>
                                {editingUser === user._id ? (
                                    <input
                                        type="text"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    user.phone
                                )}
                            </td>
                            <td>
                                {editingUser === user._id ? (
                                    <input
                                        type="text"
                                        name="profession"
                                        value={formData.profession}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    user.profession
                                )}
                            </td>
                            <td>
                                {editingUser === user._id ? (
                                    <Button variant="success" onClick={handleSave}>
                                        Save
                                    </Button>
                                ) : (
                                    <Button variant="warning" onClick={() => handleEditClick(user)}>
                                        Edit
                                    </Button>
                                )}
                                <Button
                                    variant="danger"
                                    onClick={() => handleDelete(user._id)}
                                    style={{ marginLeft: '10px' }}
                                >
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default HomePage;
