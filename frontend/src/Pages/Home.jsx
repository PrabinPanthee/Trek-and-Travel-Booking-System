import React from 'react'
import  '../style/Home.css'
import { Container,Row,Col } from 'reactstrap'
import homeImg from '../assets/images/syambhu-img01.jpg'
import homeImg02 from '../assets/images/mountain-img02.jpg'
import homeImg03 from '../assets/images/lake-img03.jpg'
import homeImg04 from '../assets/images/hatti-img04.jpg'
import nepalImg from '../assets/images/nepal.png'
import experienceImg from '../assets/images/experience.png'

import Subtitle from '../shared/Subtitle'
import FeaturedTourList from '../components/Featured-tours/FeaturedTourList'
import MasonaryGallery from '../components/images-gallery/MasonaryGallery'
import Subscribe from '../shared/subscribe'
function Home() {
    
  return (
    <>
    {/* ---------------home main section---------------- */}
    <section>
    <Container>
      <Row>
      <Col lg='2'>
          <div className="home__img-box mt-5">
            <img src={homeImg03} alt="" />
          </div>
        </Col>
        <Col lg='2'>
          <div className="home__img-box">
            <img src={homeImg04} alt="" />
          </div>
        </Col>
        <Col lg='4'>
          <div className="home__content">
            <div className="home__subtitle d-flex align-items-center">
              <Subtitle subtitle= {"know Nepal Better"}/>
              <img src={nepalImg} alt="" />
            </div>
            <h1>Traveling opens the door to create <span className="highlight">memories</span></h1>
              <p> 
                Nepal's allure lies in its blend of vibrant culture and awe-inspiring scenery, where each moment is a canvas painted with adventure. From the bustling streets of Kathmandu to the serene peaks of the Himalayas, it's a journey that leaves an indelible mark on the soul.
              </p>

          </div>
        </Col>

        <Col lg='2'>
          <div className="home__img-box">
            <img src={homeImg} alt="" />
          </div>
        </Col>
        <Col lg='2'>
          <div className="home__img-box mt-5">
            <img src={homeImg02} alt="error" />
          </div>
        </Col>
      </Row>
    </Container>
    
    </section>
    {/* ---------------home sercives title  section---------------- */}
   
      {/* ---------------featured tour section start---------------- */}
      <section>
        <Container>
          <Row>
            <Col lg="12" className='mb-5'>
              <Subtitle subtitle={'Explore'}/>
              <h2 className="featured__tour-title">Our featured tours</h2>
            </Col>
            <FeaturedTourList/>
          </Row>
        </Container>
      </section>
      {/* ---------------featured tour section end---------------- */}
      <section>
        <Container>
          <Row>
            <Col lg="6">
              <div className="experience__content">
                <Subtitle subtitle={"Experience"}/>
                <h2>
                  With our all experience <br /> we will serve you
                </h2>
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde ex explicabo pariatur, quos tempore earum harum ipsam exercitationem facilis, eos maiores tempora non accusantium, odio consequuntur repellendus corporis commodi cumque voluptatem voluptas. Quidem doloribus accusantium illum ad voluptatem illo ipsum rem eaque, enim fugit cumque cupiditate nisi itaque perferendis unde?
                </p>
              </div>
              <div className="counter__wrapper d-flex align-items-center gap-5 ">
               <div className="counter__box">
                <span>12K+</span>
                <h6>Successful trip</h6>
                </div> 
               <div className="counter__box">
                <span>2K+</span>
                <h6>Regular Clients</h6>
                </div> 
               <div className="counter__box">
                <span>15</span>
                <h6>Years experience</h6>
                </div> 
              </div>
            </Col>
            <Col lg='6'>
              <div className="experience__img">
                <img src={experienceImg} alt="" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      {/* ---------------Experience section start---------------- */}
      {/* ---------------Gallery section start---------------- */}
      <section>
        <Container>
          <Row>
            <Col lg="12">
              <Subtitle subtitle={"Gallery"}/>
              <h2 className="gallery__title">
                Visit our customers tour gallery
              </h2>
            </Col>
            <Col lg='12'>
              <MasonaryGallery/>
            </Col>
          </Row>
        </Container>
        
      </section>
      {/* ---------------Gallery section end---------------- */}
      {/* ---------------Subscribe section start---------------- */}   
      <Subscribe/>
      {/* ---------------Subscribe section end---------------- */}
       
      
    </>
  )
}

export default Home