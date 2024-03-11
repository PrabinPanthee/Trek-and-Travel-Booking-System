import React,{useState} from 'react'
import {Container,Row,Col,FormGroup,Form,Button} from 'reactstrap'
import{Link} from 'react-router-dom'
import '../style/login.css'
import userIcon from '../assets/images/user.png'

function Register() {
  const[credentials, setCredentials] = useState({
    userName:undefined,
    email:undefined,
    password:undefined,
  });
  const handleChange=e=>{
    setCredentials(prev=>({...prev,[e.target.id]:e.target.value}))
   };
   const handleClick = e=>{
    e.preventDefault();
    console.log(credentials)
   }
  return (
    <section>
      <Container>
        <Row>
          <Col lg='8' className='m-auto'>
            <div className="login__container d-flex justify-content-between">
              <div className="login__form">
                <div className="user">
                  <img src={userIcon} alt="" />
                </div>
                <h2>Register</h2>
              <Form onSubmit={handleClick}>
              <FormGroup>
                  <input type="text" placeholder='Username' id='userName' required 
                  onChange={handleChange}/>
                </FormGroup>
                <FormGroup>
                  <input type="email" placeholder='Email' id='email' required 
                  onChange={handleChange}/>
                </FormGroup>
                <FormGroup>
                  <input type="password" placeholder='Password' id='password' onChange={handleChange} />
                </FormGroup>
                <Button className='btn secondary__btn auth__btn' type='submit'>Register</Button>
                
              </Form>
              <p>Have an account? <Link to='/login'>Login</Link></p>
              </div>
              
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Register