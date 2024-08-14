import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css';

const RegisterPage = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', phone: '', profession: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/users/register', formData);
            alert(res.data.message);
            navigate('/');
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    const handleLogin = () => {
        navigate('/');
    }

    return (
        <Container className='container'>
            {/* <h2>Register</h2> */}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
                </Form.Group>
                <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
                </Form.Group>
                <Form.Group controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} required />
                </Form.Group>
                <Form.Group controlId="formPhone">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control type="text" name="phone" value={formData.phone} onChange={handleChange} required />
                </Form.Group>
                <Form.Group controlId="formProfession">
                    <Form.Label>Profession</Form.Label>
                    <Form.Control type="text" name="profession" value={formData.profession} onChange={handleChange} required />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Register
                </Button>
                <h4>Already have an account?</h4>

                <Button onClick={handleLogin} variant="primary" type="submit">Login Here</Button>
            </Form>
        </Container>
    );
};

export default RegisterPage;
