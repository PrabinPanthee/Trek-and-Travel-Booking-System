import React, { useState, useContext } from 'react';
import { Container, Row, Col, FormGroup, Form, Button } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../style/login.css';
import userIcon from '../assets/images/user.png';
import { AuthContext } from '../context/authContext';
import { BASE_URL } from './../utils/config';

function Register() {
  const [credentials, setCredentials] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setError(''); // Clear any previous error message
    const { id, value } = e.target;

    if (id === 'username' && value && !/^[a-zA-Z]/.test(value)) {
      setError('Username must start with a letter.');
      return;
    }

    setCredentials((prev) => ({ ...prev, [id]: value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    if (!credentials.username || !credentials.email || !credentials.password) {
      setError('All fields are required.');
      return;
    }

    if (credentials.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const result = await res.json();
      if (!res.ok) {
        alert(result.message);
        return;
      }

      dispatch({ type: 'REGISTER_SUCCESS' });
      navigate('/login');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="8" className="m-auto">
            <div className="login__container d-flex justify-content-between">
              <div className="login__form">
                <div className="user">
                  <img src={userIcon} alt="" />
                </div>
                <h2>Register</h2>
                <Form onSubmit={handleClick}>
                  <FormGroup>
                    <input
                      type="text"
                      placeholder="Username"
                      id="username"
                      required
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="email"
                      placeholder="Email"
                      id="email"
                      required
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="password"
                      placeholder="Password"
                      id="password"
                      required
                      onChange={handleChange}
                    />
                  </FormGroup>
                  {error && <p className="text-danger">{error}</p>}
                  <Button className="btn secondary__btn auth__btn" type="submit">
                    Register
                  </Button>
                </Form>
                <p>
                  Have an account? <Link to="/login">Login</Link>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Register;

