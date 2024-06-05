
import axios from 'axios'
import React,{useState} from 'react'
import './Booking.css'
import {Form,FormGroup,ListGroup,ListGroupItem,Button,Input} from 'reactstrap'

import { BASE_URL } from '../../utils/config'

import { AuthContext } from '../../context/authContext'
import { useContext } from 'react'
import bookingValidation from '../../Validation/bookingValidation'


const Booking = ({tour,avgRating}) => {
  const {price,reviews,title} = tour;  
 

  const{user} = useContext(AuthContext)

  const[booking, setBooking] = useState({
    phone:'',
    guestSize:1,
    bookAt:''
  })
 
  const handleChange=e=>{
   setBooking(prev=>({...prev,[e.target.id]:e.target.value}))
  };

   const [errors,setErrors] = useState({});

  // send data to the server

  const totalAmount = Number(price)*Number(booking.guestSize)

  const handleClick = async e=>{
    e.preventDefault()
    const phone = booking.phone.trim();
    const guestSize = parseInt(booking.guestSize);
    const validationErrors = bookingValidation(booking)
    setErrors(validationErrors);
    if(Object.keys(validationErrors).length ===0){
    try {
      if(!user || user===undefined || user===null){
        return alert('Please sign in')
      } else if (user.role ==="admin") {
        return alert('only users are allowed')
      }
      const totalPrice = Number(price)*Number(guestSize) 
      const bookingData={
        userId : user && user._id, 
        userEmail:user && user.email,
        tourName :title,
        fullName:user && user.username,
        phone:phone,
        guestSize:guestSize,
        price:price,
        totalAmount:totalPrice,
        bookAt:booking.bookAt
      }
      console.log(bookingData)
      const res = await fetch(`${BASE_URL}/booking`,{
        method:'post',
        headers:{
          'content-type':'application/json'
        },
        credentials:'include',
        body:JSON.stringify(bookingData)
      })
      const result = await res.json()
      const data = result.data;
      const{_id:bookId, totalAmount:amount} = data;
      
      handlePaymentKhalti(bookId,amount)
      
      if(!res.ok){
        return alert(result.message)
      } 
    
    } catch (err) {
      alert(err.message)
    }
    }
  };
  
  const handlePaymentKhalti = async (bookId,amount) => {
    try {
        const response = await axios.post(
            `${BASE_URL}/payment/initiatekhalti`,
            { amount: amount, bookId: bookId },
            {
                withCredentials: true // Include credentials in the request
            }
        );
        window.location.href = response.data.paymentUrl;
        console.log(response.data);
    } catch (error) {
        console.log(error);
    }
};

  return (
    <div className="booking">
    <div className="booking__top d-flex align-items-center justify-content-between">
        <h3>Rs{price} <span>/per person</span></h3>
        <span className="tour__rating d-flex align-items-center ">
                <i className="ri-star-s-fill"></i>{avgRating ===0?null:avgRating}
               ({reviews?.length})
         </span>
    </div>
    {/* -----------------------------booking form------------------------------ */}
    <div className="booking__form">
      <h5>Information</h5>
      <Form className='booking__info-form' onSubmit={handleClick}>
        <FormGroup>
          <Input type="text" id='fullName' value={user && user.username} required readOnly />
        </FormGroup>
        <FormGroup>
          <Input type="number" placeholder='Phone' id='phone' required onChange={handleChange} />
          {errors.phone && <p style={{ color: "red" }}>{errors.phone}</p>}
        </FormGroup>
      <div className="flex-container">
        <FormGroup className='d-flex align-items-center gap-3'>
            <Input type="date" placeholder='' id='bookAt' required onChange={handleChange} />
        </FormGroup>
        {errors.bookAt && <p style={{ color: "red" }}>{errors.bookAt}</p>}
    </div>
    <div className="flex-container">
        <FormGroup className='d-flex align-items-center gap-3'>
            <Input type="number" placeholder='No of people' id='guestSize' required onChange={handleChange} />
        </FormGroup>
        {errors.guestSize && <p style={{ color: "red" }}>{errors.guestSize}</p>}
    </div>
    </Form>
    </div>
    {/* -----------------------------booking form end------------------------------ */}
    {/* -----------------------------booking bottom------------------------------ */}
       <div className="booking__bottom">
        <ListGroup>
           <ListGroupItem className='border-0 px-0'>
            <h5 className="d-flex align-items-center gap-1">
              Rs{price} <i class="ri-close-line"></i> 1 person </h5>
              <span>Rs{price}</span>
           </ListGroupItem>
          
           <ListGroupItem className='border-0 px-0 total'>
            <h5>Total </h5>
              <span>Rs{totalAmount}</span>
           </ListGroupItem>
        </ListGroup>

        <Button className='btn primary__btn w-100 mt-4' onClick ={handleClick}>Book Now</Button>
       </div>

    {/* -----------------------------booking bottom end------------------------------ */}

</div>

  )
}

export default Booking