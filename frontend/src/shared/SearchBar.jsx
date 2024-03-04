import React, { useRef } from 'react'
import './SearchBar.css'
import {Col,Form,FormGroup} from  'reactstrap'

function SearchBar() {
  const locationRef = useRef('');
  const distanceRef = useRef(0);
  const maxPeopleRef = useRef(0);
   
  const searchHndler = ()=>{ 
    const location = locationRef.current.value;
    const distance = distanceRef.current.value;
    const maxPeople = maxPeopleRef.current.value;
  
    if(location==='' || distance===''|| maxPeople===''){
      
      return alert("All fields are required");
    }
  }
 
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
          <FormGroup className='d-flex gap-3 form__group form__group-fast'> 
            <span><i className="ri-pin-distance-line"></i></span>
            <div>
              <h6>Distance</h6>
              <input type="number" placeholder='distance k/m' ref = {distanceRef}/>
            </div>
          </FormGroup>
          <FormGroup className='d-flex gap-3 form__group form__group-fast'>
            <span><i className="ri-group-fill"></i></span>
            <div>
              <h6>Max People</h6>
              <input type="number" placeholder='0' ref={maxPeopleRef}/>
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