
import React from 'react'
import CommonSection from '../shared/CommonSection'
import TourCard from '../shared/TourCard'
import SearchBar from '../shared/SearchBar'
import { useNavigate } from 'react-router-dom';
import {Container,Row,Col,Button} from 'reactstrap'
import '../style/tour.css'
import useFetch from '../hooks/useFetch'
import { BASE_URL } from '../utils/config'
import { useContext } from 'react'
import { AuthContext } from '../context/authContext'
function Tour() {
  const { user } = useContext(AuthContext);
  const isAdmin = user && user.role === 'admin';
  const navigate = useNavigate();

  const {data:tours ,loading ,error} = useFetch(`${BASE_URL}/tours`);
  const handleAdminButtonClick = () => {
    navigate('/admin');
  };

  
  return (
    <>
    <CommonSection title={'Our All Tours Collection'}/>
    <section>
      <Container>
        <Row>
          <Col lg="6" ><SearchBar /></Col>
          {isAdmin && (
              <Col lg="6" className="text-lg-end">
                <Button color="primary" onClick={handleAdminButtonClick}>
                 Manage Tours
                </Button>
              </Col>
            )}
           
        </Row>
      </Container>
    </section>
    <section className='pt-0'>
      <Container>
        {loading && <h4 className='text-center pt-5'>Loading........</h4>}
        {error && <h4 className='text-center pt-5'>{error}</h4>}
      {
        !loading && !error && <Row>{
          tours?.map(tour=>(
            <Col lg='3' className='mb-4' key={tour._id}><TourCard tour={tour}/></Col>
          ))
        }
      </Row>
      }
      </Container>
      
    </section>
    </>

  )
}

export default Tour