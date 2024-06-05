import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import { BASE_URL } from '../utils/config';
import { Container, Row,Col,Button } from 'reactstrap';
import AdminTourCard from '../shared/AdminTourCard';

const AdminToursList = () => {
  const { user } = useContext(AuthContext);
  
  const [datas, setData] = useState([]);
  
  useEffect(() => {
    const fetchTourData = async () => {
      try {
        const res = await fetch(`${BASE_URL}/tours`, {
          credentials: "include", //includes cookies 
        });
        if (res.ok) {
          const result = await res.json();
          setData(result.data);
        } else {
          throw new Error('Failed to fetch tour data');
        }
      } catch (err) {
        console.error('Fetch error:', err);
        alert(err.message);
      }
    };
    if (user) {
      fetchTourData();
    }
  }, [user]);
  const handleRemove = async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/tours/${id}`, {
        method: 'DELETE',
        credentials: "include", // includes cookies 
      });
      if (res.ok) {
        // Call the setData function passed from the parent to update the data locally
        setData(prevData => prevData.filter(data => data._id !== id));
        alert('Tour removed successfully');
      } else {
        throw new Error('Failed to remove tour');
      }
    } catch (err) {
      console.error('Remove error:', err);
      alert(err.message);
    }
  };

 

  return (
    
    <section className='pt-0' >
      <Container>
      {
      <Row>
        {
          datas?.map(data=>(
            <Col lg='3' className="mb-4" key={data._id}><AdminTourCard data = {data} handleRemove={handleRemove}/></Col>
          ))
        }
        {/* Create Tour Option */}
        <Col lg='3' className="mb-4">
            <Link to="/admin/Admin-tours-list/create-tour">
              <Button color="primary" outline block>
                Create Tour
              </Button>
            </Link>
          </Col>
      </Row>
      }
      </Container>
      
    </section> 

  )      
   
}

export default AdminToursList;