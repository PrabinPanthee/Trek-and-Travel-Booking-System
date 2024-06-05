

import React from 'react';
import { Card, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import calculateAvgRating from '../utils/avgRating';
import './tourCard.css';

function TourCard({ tour }) {
    const { _id, title, city, photo, price, featured, reviews } = tour;

    const { totalReview, avgRating } = calculateAvgRating(reviews);

    return (
        <div className="tour__card">
            <Card>
                <div className="tour__img">
                    <img src={photo} alt={title} onError={(e) => e.target.src = 'https://www.foodiesfeed.com/wp-content/uploads/2023/10/recycled-paper-cup.jpg'} />
                    {featured && <span>Featured</span>}
                </div>

                <CardBody>
                    <div className='card__top d-flex align-items-center justify-content-between'>
                        <span className="tour__location d-flex align-items-center gap-1">
                            <i className="ri-map-pin-5-line"></i> {city}
                        </span>
                        <span className="tour__ratting d-flex align-items-center gap-1">
                            <i className="ri-star-s-fill"></i>{avgRating === 0 ? null : avgRating}
                            {totalReview === 0 ? ("not rated") : (<span>({reviews?.length})</span>)}
                        </span>
                    </div>
                    <h5 className="tour__title"><Link to={`/tours/${_id}`}>{title}</Link></h5>
                    <div className="card__bottom d-flex justify-items-center justify-content-between mt-3">
                        <h5>Rs{price} <span>/per person</span></h5>
                        <button className="btn booking__btn">
                            <Link to={`/tours/${_id}`}>Book Now</Link>
                        </button>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}

export default TourCard;
