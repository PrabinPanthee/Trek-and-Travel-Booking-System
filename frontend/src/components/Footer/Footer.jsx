import React from 'react'
import { Container,Row,Col,ListGroup,ListGroupItem } from 'reactstrap'
import { Link } from 'react-router-dom'
import Logo from "../../assets/images/logo.png"
import './Footer.css'

const quick__links =[
  {
    path:'/home',
    display: 'Home'
  },
  {
    path:'/about',
    display:'About'
  },
  {
    path:'/tour',
    display: "Tour"
  }
] 
const quick__links2 =[
  {
    path:'/gallery',
    display: 'Gallery'
  },
  {
    path:'/login',
    display:'Login'
  },
  {
    path:'/register',
    display: "Register"
  }
] 
function Footer() {
  const year = new Date().getFullYear()
  return (
   <>
   <footer className="footer">
    <Container>
      <Row>
        <Col lg='3'>
          <div className="logo">
              <img src={Logo} alt="" />
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Explicabo, exercitationem?</p>
            
              <div className="social__links d-flex align-items-center gap-4">
                <span>
                  <Link to='#'><i class="ri-mail-line"></i></Link>
                </span>
                <span>
                  <Link to='#'><i class="ri-phone-line"></i></Link>
                </span>
                <span>
                  <Link to='#'><i class="ri-instagram-line"></i></Link>
                </span>
              
              </div>

          </div>
        </Col>
        <Col lg='3'>
          <h5 className="footer__Link-title">Discover</h5>
          <ListGroup className='footer__quick-links'>
            {
              quick__links.map((item,index)=>(
                <ListGroupItem className="border-0" key={index}>
                  <Link to={item.path}>{item.display}</Link>
                </ListGroupItem>             
                 ))
            }    
          </ListGroup>
        </Col>
        <Col lg='3'>
          <h5 className="footer__Link-title">Quick Links</h5>
          <ListGroup className='footer__quick-links'>
            {
              quick__links2.map((item,index)=>(
                <ListGroupItem className="border-0"key={index}>
                  <Link to={item.path}>{item.display}</Link>
                </ListGroupItem>             
                 ))
            }    
          </ListGroup>
        </Col>
        <Col lg='3'>
          <h5 className="footer__Link-title">Contacts</h5>
          <ListGroup className='footer__quick-links'>
            
            
                <ListGroupItem className="border-0 ps-0 d-flex align-items-center gap-2">
                  <h6><span><i className="ri-map-pin-line"></i></span>
                  </h6>
                  <p>Butwal,Nepal</p>
                </ListGroupItem>             
                
                <ListGroupItem className="border-0 ps-0 d-flex align-items-center gap-2">
                  <h6><span><i class="ri-mail-line"></i></span>
                  </h6>
                  <p>trekingguide@gmail.com</p>
                </ListGroupItem>                       
          </ListGroup>
        </Col>
        <Col lg='12' className='text-center pt-5'>
          <p className="copyright">
            All rights reserved. <br />
            Copyright {year},Developed @ Prabin-tech
          </p>
        </Col>
      </Row>
    </Container>
    

   </footer>
   
   
   </>
  )
}

export default Footer