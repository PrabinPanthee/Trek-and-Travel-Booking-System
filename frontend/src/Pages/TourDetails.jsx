
import React, { useContext, useEffect, useRef, useState } from 'react';
import '../style/TourDetails.css';
import { Container, Row, Col, Form, ListGroup, Button } from 'reactstrap';
import { useParams, useNavigate } from 'react-router-dom';

import calculateAvgRating from '../utils/avgRating';
import avatar from '../assets/images/avatar.jpg';
import Booking from '../components/Booking/Booking';
import useFetch from '../hooks/useFetch';
import { BASE_URL } from '../utils/config';
import { AuthContext } from '../context/authContext';

function TourDetails() {
  const { id } = useParams();
  const reviewMsgRef = useRef('');
  const [tourRating, setTourRating] = useState(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Fetch data from the database
  const { data: tour, loading, error } = useFetch(`${BASE_URL}/tours/${id}`);

  // Destructure properties from tour object
  const { photo, title, desc, price, reviews, city, distance, address, maxGroupSize } = tour;
  const { totalReview, avgRating } = calculateAvgRating(reviews);
  const options = { day: 'numeric', month: 'long', year: 'numeric' };

  const submitHandler = async e => {
    e.preventDefault();
    const reviewText = reviewMsgRef.current.value;

    try {
      if (!user || user === undefined || user === null) {
        alert('Please sign in');
      } else if (user.role === 'admin') {
        alert('Only users are allowed');
      } else {
        const reviewObj = {
          username: user?.username,
          reviewText,
          rating: tourRating
        };

        const res = await fetch(`${BASE_URL}/review/${id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify(reviewObj)
        });

        const result = await res.json();
        if (!res.ok) {
          return alert(result.message);
        }
        alert(result.message);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [tour]);

  return (
    <>
      <section>
               
        <Container>
                  {user && user.role === 'admin' && (
                  <Button className='mt-4' color='primary' onClick={() => navigate('/admin')}>
                    Home
                  </Button>
                  )}
          {loading && <h4 className='text-center pt-5'>Loading........</h4>}
          {error && <h4 className='text-center pt-5'>{error}</h4>}
          {!loading && !error && (
            <Row>
              <Col lg='8'>
                <div className='tour__content'>
                  <img src={photo} alt='' />
                  <div className='tour__info'>
                    <h2>{title}</h2>
                    <div className='d-flex align-items-center gap-5'>
                      <span className='tour__ratting d-flex align-items-center gap-1'>
                        <i className='ri-star-s-fill' style={{ color: 'var(--secondary-color)' }}></i>
                        {avgRating === 0 ? null : avgRating}
                        {totalReview === 0 ? (
                          'not rated'
                        ) : (
                          <span>({reviews?.length})</span>
                        )}
                      </span>
                      <span>
                        <i className='ri-map-pin-fill' style={{ color: 'var(--secondary-color)' }}></i> {address}
                      </span>
                    </div>
                    <div className='tour__extra-details'>
                      <span>
                        <i className='ri-map-pin-2-line' style={{ color: 'var(--secondary-color)' }}></i>
                        {city}
                      </span>
                      <span>
                        <i className='ri-compass-line' style={{ color: 'var(--secondary-color)' }}></i>
                        {distance} k/m
                      </span>
                      <span>
                        <i className='ri-money-dollar-circle-fill' style={{ color: 'var(--secondary-color)' }}></i>
                        Rs{price}/per person
                      </span>
                      <span>
                        <i className='ri-group-fill' style={{ color: 'var(--secondary-color)' }}></i>
                        {maxGroupSize} people
                      </span>
                    </div>
                    <h5>Description</h5>
                    <p>{desc}</p>
                  </div>

                  {/*------------------------------tour reviews section start----------------------------------*/}

                  <div className='tour__reviews mt-4'>
                    <h4>Reviews ({reviews?.length} reviews)</h4>
                    <Form onSubmit={submitHandler}>
                      <div className='d-flex align-items-center gap-3 mb-4 rating__group'>
                        <span onClick={() => setTourRating(1)}>
                          1<i className='ri-star-s-fill' style={{ color: 'var(--secondary-color)' }}></i>
                        </span>
                        <span onClick={() => setTourRating(2)}>
                          2<i className='ri-star-s-fill' style={{ color: 'var(--secondary-color)' }}></i>
                        </span>
                        <span onClick={() => setTourRating(3)}>
                          3<i className='ri-star-s-fill' style={{ color: 'var(--secondary-color)' }}></i>
                        </span>
                        <span onClick={() => setTourRating(4)}>
                          4<i className='ri-star-s-fill' style={{ color: 'var(--secondary-color)' }}></i>
                        </span>
                        <span onClick={() => setTourRating(5)}>
                          5<i className='ri-star-s-fill' style={{ color: 'var(--secondary-color)' }}></i>
                        </span>
                      </div>
                      <div className='review__input'>
                        <input type='text' ref={reviewMsgRef} placeholder='Share your thoughts' required />
                        <button className='btn primary__btn text-white' type='submit'>
                          Submit
                        </button>
                      </div>
                    </Form>
                    <ListGroup className='user__reviews'>
                      {reviews?.map(_review => (
                        <div className='review__item' key={_review._id}>
                          <img src={avatar} alt='' />
                          <div className='w-100'>
                            <div className='d-flex align-items-center justify-content-between'>
                              <div>
                                <h5>{_review.username}</h5>
                                <p>{new Date(_review.createdAt).toLocaleDateString('en-US', options)}</p>
                              </div>
                              <span className='d-flex align-items-center'>
                                {_review.rating}
                                <i className='ri-star-s-fill' style={{ color: 'var(--secondary-color)' }}></i>
                              </span>
                            </div>
                            <h5>{_review.reviewText}</h5>
                          </div>
                        </div>
                      ))}
                    </ListGroup>
                  </div>

                  {/*------------------------------tour reviews section end----------------------------------*/}
                </div>
              </Col>
              <Col lg='4'>
                <Booking tour={tour} avgRating={avgRating} />
              </Col>
            </Row>
          )}
        </Container>
      </section>
    </>
  );
}

export default TourDetails
