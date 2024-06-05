import React, { useRef } from 'react'
import './SearchBar.css'
import {Col,Form,FormGroup} from  'reactstrap'
import { BASE_URL } from '../utils/config';
import { useNavigate } from 'react-router-dom';

function SearchBar() {
  const locationRef = useRef('');
  
  const navigate = useNavigate();
   
  const searchHndler = async()=>{ 
    const location = locationRef.current.value;
   
    
  
    if(location===''){
      
      return alert("All fields are required");
    }
    const res = await fetch(`${BASE_URL}/tours/search/getTourBySearch?city=${location}`)
    if(!res.ok) alert("something went wrong")
    const result = await res.json()
   navigate(`/tours/search?city=${location}`,{state: result.data})
  };
 
  return (
    <Col lg = '12'>
      <div className="search__bar">
        <Form className='d-flex align-items-center gap-4'>
          <FormGroup className='d-flex gap-3 form__group form__group-fast'>
            <span><i className="ri-map-pin-2-fill"></i></span>
            <div>
              <h6>location</h6>
              <input type="text" placeholder='Search for Treks' ref={locationRef}/>
            </div>
          </FormGroup>
          
          <span className="search__icon" type = "submit" onClick={searchHndler}>
          <i className="ri-search-2-line"></i>
          </span>
        </Form>
      </div>
    </Col>
    
  )
}

export default SearchBar