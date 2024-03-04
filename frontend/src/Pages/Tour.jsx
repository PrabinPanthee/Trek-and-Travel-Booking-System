<<<<<<< HEAD
import React from 'react'

function Tour() {
  return (
    <div>Tour</div>
=======
import React,{useState,useEffect}from 'react'
import CommonSection from '../shared/CommonSection'
import TourCard from '../shared/TourCard'
import SearchBar from '../shared/SearchBar'
import tourData from '../assets/data/tours'
import {Container,Row,Col} from 'reactstrap'
import '../style/tour.css'

function Tour() {
  const [pageCount, setPageCount] = useState(0);
  const [page,setPage] = useState(0);
  useEffect(()=>{

    const pages = Math.ceil(5/4)
    setPageCount(pages)
  },[page])
  return (
    <>
    <CommonSection title={'Our All Tours Collection'}/>
    <section>
      <Container>
        <Row>
           <SearchBar />
        </Row>
      </Container>
    </section>
    <section className='pt-0'>
      <Container>
        <Row>
          {
            tourData?.map(tour=>(
              <Col lg='3' key={tour.id}><TourCard tour = {tour}/></Col>
            ))
          }
          <Col lg='12'>
            <div className="pagination d-flex align-items-center justify-content-center mt-4 gap-3">
              {[...Array(pageCount).keys()].map(number=>
                (
                  <span key={number} onClick={()=>setPage(number)} className={page===number ? "active__page" : ""}>
                    {number+1}
                  </span>
                ))}
            </div>
          </Col>
        </Row>
      </Container>
      
    </section>
    </>
>>>>>>> 0f5525d82 (added tour details and Booking layout)
  )
}

export default Tour