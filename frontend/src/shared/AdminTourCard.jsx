
import React from 'react'
import { Card,CardBody } from 'reactstrap'
import {Link} from 'react-router-dom'
import calculateAvgRating from '../utils/avgRating';
import './AdminTourCard.css'


function AdminTourCard({data,handleRemove}) {
    const{_id,title,city,photo,price,featured,reviews} = data;
    const{totalReview,avgRating} = calculateAvgRating(reviews);
    
    return (
        <div className="tour__card-1">
            <Card>
                <div className="tour__img-1">
                    <img src={photo} alt="tour-img" />
                   {featured && <span>Featured</span>} 
                </div>
                
                <CardBody>
                <div  className='card__top-1 d-flex align-items-center justify-content-between'>
                    <span className="tour__location-1 d-flex align-items-center gap-1">
                        <i className="ri-map-pin-5-line"></i> {city}
                    </span>
                    <span className="tour__ratting-1 d-flex align-items-center gap-1">
                        <i className="ri-star-s-fill"></i>{avgRating ===0?null:avgRating}
                        {totalReview === 0?("not rated"):(<span>({reviews?.length})</span>)} 
                    </span>
                </div>
                <h5 className="tour__title-1"><Link to={`/tours/${_id}`}>{title}</Link></h5>
                <div className="card__bottom-1 d-flex justify-items-center justify-content-between mt-3">
                    <h5>Rs{price} <span>/per person</span></h5>
                    <button className="btn booking__btn" onClick={()=>handleRemove(_id)}>
                        Delete
                    </button>
                    <Link to={`/admin/Admin-tours-list/${_id}`}>
                    <button className="btn booking__btn">
                       Edit
                    </button>
                    </Link>
                </div>
            </CardBody>
            </Card>
           
        </div>
    )
        
}

export default AdminTourCard