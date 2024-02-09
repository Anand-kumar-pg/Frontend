import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function SignIn() {

    const [validated, setValidated] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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
                let res = await axios
                .post('https://signin-register.onrender.com/api/user/signin', {
                    email,
                    password
                });
                console.log(res);
                if (res.data.success) {
                    toast(res.data.message);
                    await new Promise((resolve) => setTimeout(resolve, 3000));
                    navigate('/home');
                } else {
                    toast.error(res.data.message);
                }
            } catch (error) {
                toast.error(error.response.data.message);
            }
        }
    }

    const handleSubmissionemail = (e) => {

        setEmail(e.target.value);

    }
    const handleSubmissionpassword = (e) => {

        setPassword(e.target.value);

    }

    return (
        <Container className='py-4'style={{ maxWidth: "700px", marginTop: "10px" }}>
            <ToastContainer position="top-center" autoClose={5000} />
            <h1 className='mb-5 text-center'>Login</h1>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control type="email" placeholder="please enter your email" required onKeyUp={handleSubmissionemail} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control type="password" placeholder="please enter your password" required onKeyUp={handleSubmissionpassword} />
                </Form.Group>
                <Button style={{ marginLeft: 'auto', marginRight: 'auto', textAlign: 'center' }} variant="primary" type="submit">
                    Submit
                </Button>
            </Form>


        </Container>
    );
}


export default SignIn;