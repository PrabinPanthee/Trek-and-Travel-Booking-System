import React,{useState, useContext} from 'react'
import {Container,Row,Col,FormGroup,Form,Button} from 'reactstrap'
import{Link , useNavigate} from 'react-router-dom'
import '../style/login.css'
import { AuthContext } from '../context/authContext'
import userIcon from '../assets/images/user.png'
import { BASE_URL } from '../utils/config'

function Login() {
  const[credentials, setCredentials] = useState({
    email:undefined,
    password:undefined,
  });

  const {dispatch} = useContext(AuthContext)
  const navigate = useNavigate()

  const handleChange=e=>{
    setCredentials(prev=>({...prev,[e.target.id]:e.target.value}))
   };
   const handleClick = async e=>{
    e.preventDefault();
    dispatch({type:'LOGIN_START'})

    try {
      const res = await fetch(`${BASE_URL}/auth/login`,{
        method:'post',
        headers:{
          'content-type':'application/json'
        },
        credentials:'include',
        body:JSON.stringify(credentials),
      })
      const result = await res.json()
      if (!res.ok) alert(result.message)
      console.log(result.data)

      dispatch({type:'LOGIN_SUCCESS', payload:result.data})

      if (result.data.role === 'admin') {
        // If admin, navigate to the AdminLayout component
        navigate('/admin');
    } else {
        // If not admin, navigate to the home page
        navigate('/');
    }

    } catch (err) {
      dispatch({type:"LOGIN_FAILURE", payload:err.message});
    }
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
                <h2>Login</h2>
              <Form onSubmit={handleClick}>
                <FormGroup>
                  <input type="email" placeholder='Email' id='email' required 
                  onChange={handleChange}/>
                </FormGroup>
                <FormGroup>
                  <input type="password" placeholder='Password' id='password' required onChange={handleChange} />
                </FormGroup>
                <Button className='btn secondary__btn auth__btn' type='submit'>Login</Button>
                
              </Form>
              <p>Dont have an account? <Link to='/register'>Create</Link></p>
              </div>
              
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Login