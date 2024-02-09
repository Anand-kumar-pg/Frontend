import React, { useState } from 'react';
import { Container, Button, Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { userAuthSuccess } from '../redux/userAuth';
import { useDispatch } from 'react-redux';
import instance from 'axios';

function SignUp() {

    const [validated, setValidated] = useState(false);
    const [inputs, setInputs] = useState({
        fullName: '',
        email: '',
        password: ''
    });
    const dispatch = useDispatch();

    const buttonStyle = {
        textAlign: 'center'
    };

    const handleInputs = (event) => {
        const { value, name } = event.target;
        setInputs((prevState) => {
            return {
                ...prevState,
                [name]: value

            }
        })

    }
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
            setValidated(true);
        } else {
            setValidated(true);
            try {
                let res = await instance
                    .post('https://signin-register.onrender.com/api/user/register', {
                        ...inputs
                    });
                if (res.data.success) {
                    dispatch(userAuthSuccess({ user: res.data.user, isAuthenticated: res.data.isAuthenticated, token: res.data.token }))
                    toast(res.data.message);
                    await new Promise((resolve) => setTimeout(resolve, 3000));
                    navigate('/signin');
                } else {
                    toast.error(res.data.message);
                }
            } catch (error) {
                toast.error(error.response.data.message);
            }

        }
    }

    return (
        <Container className='py-4' style={{ maxWidth: "700px", marginTop: "10px" }}>
            <ToastContainer position="top-center" autoClose={2000} />
            <h1 className='mb-5 text-center'>Register</h1>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Control type="text" placeholder="please enter your fullname" required onChange={handleInputs} value={inputs.fullName} name='fullName' />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control type="email" placeholder="please enter your email" required onChange={handleInputs} value={inputs.email} name='email' />
                </Form.Group>
                <Form.Control.Feedback type="invalid"> Please Enter your email.</Form.Control.Feedback>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control type="password" placeholder="please enter your password" required onChange={handleInputs} value={inputs.password} name='password' />
                </Form.Group>
                <Button style={buttonStyle} variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    );
}

export default SignUp;