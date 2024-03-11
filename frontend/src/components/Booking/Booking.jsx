

import React,{useState} from 'react'
import './Booking.css'
import {Form,FormGroup,ListGroup,ListGroupItem,Button} from 'reactstrap'
import { useNavigate } from 'react-router-dom'


const Booking = ({tour,avgRating}) => {
  const {price,reviews} = tour;
  const[credentials, setCredentials] = useState({
    userId :'01', //later it will be dynamic
    userEmail:'hello@gmail.com',
    fullName:'',
    Phone:'',
    guestSize:1,
    bookAt:''
  })
  const handleChange=e=>{
   setCredentials(prev=>({...prev,[e.target.id]:e.target.value}))
  };
  const navigate = useNavigate();

  // send data to the server

  const serviceFee =10;
  const totalAmount = Number(price)*Number(credentials.guestSize) + Number(serviceFee);

  const handleClick =e=>{
    e.preventDefault()
     
    navigate('/Payment-GateAway');
  }
  return (
    <div className="booking">
    <div className="booking__top d-flex align-items-center justify-content-between">
        <h3>${price} <span>/per person</span></h3>
        <span className="tour__rating d-flex align-items-center ">
                <i className="ri-star-s-fill"></i>{avgRating ===0?null:avgRating}
               ({reviews?.length})
         </span>
    </div>
    {/* -----------------------------booking form------------------------------ */}
    <div className="booking__form">
      <h5>Information</h5>
      <Form className='booking__info-form'onSubmit={handleClick}>
        <FormGroup>
            <input type="text" placeholder='Full Name' id='fullName' required onChange={handleChange} />
        </FormGroup>
        <FormGroup>
            <input type="number" placeholder='Phone' id='Phone' required onChange={handleChange} />
        </FormGroup>
        <FormGroup className='d-flex align-items-center gap-3'>
            <input type="date" placeholder='' id='bookAt' required onChange={handleChange} />
            <input type="number" placeholder='No of people' id='guestSize' required onChange={handleChange} />
        </FormGroup>
      </Form>
    </div>
    {/* -----------------------------booking form end------------------------------ */}
    {/* -----------------------------booking bottom------------------------------ */}
       <div className="booking__bottom">
        <ListGroup>
           <ListGroupItem className='border-0 px-0'>
            <h5 className="d-flex align-items-center gap-1">
              ${price} <i class="ri-close-line"></i> 1 person </h5>
              <span>${price}</span>
           </ListGroupItem>
           <ListGroupItem className='border-0 px-0'>
            <h5>Service charge</h5>
              <span>${serviceFee}</span>
           </ListGroupItem>
           <ListGroupItem className='border-0 px-0 total'>
            <h5>Total </h5>
              <span>${totalAmount}</span>
           </ListGroupItem>
        </ListGroup>

        <Button className='btn primary__btn w-100 mt-4' onClick ={handleClick}>Book Now</Button>
       </div>

    {/* -----------------------------booking bottom end------------------------------ */}

</div>

  )
}

export default Booking
