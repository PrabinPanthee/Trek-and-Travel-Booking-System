

import React from 'react'
import './subscribe.css'
import { Container,Row,Col } from 'reactstrap'
import maleTourist from '../assets/images/male-tourist.png'
const subscribe = () => {
  return (
    <>
    <section className="subscribe">
        <Container>
            <Row>
                <Col lg='6'>
                    <div className="subscribe__content">
                        <h2>Subscribe for traveling information</h2>
                        <div className="subscribe__input">
                            <input type="email" placeholder='Enter your email' />
                            <button className="btn subscribe__btn">Subscribe</button>
                        </div>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. , dignissimos deleniti minus nesciunt, repudiandae esse fuga labore?</p>
                    </div>
                </Col>
                <Col lg='6'>
                    <div className="subscribe__img">
                        <img src={maleTourist} alt="" />
                    </div>
                </Col>
            </Row>
        </Container>
    </section>
    
    
    </>
   
  )
}

export default subscribe