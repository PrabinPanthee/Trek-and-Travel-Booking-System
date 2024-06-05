import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import TourCard from '../shared/TourCard';
import { Col, Container, Row } from 'reactstrap';
import '../style/SearchResult.css'

function SearchResultList() {
    const location = useLocation();
    const [data] = useState(location.state);
    console.log(data);

    return (
        <>
            
            <section>
                <Container>
                    <Row>
                        {data.length === 0 ? (
                            <div className="text-center no-result-message">
                                <h4>Sorry, no results found. 😔</h4>
                                <p>Please try a different search term.</p>
                            </div>
                        ) : (
                            data?.map((tour) => (
                                <Col lg="3" className="mb-4" key={tour._id}>
                                    <TourCard tour={tour} />
                                </Col>
                            ))
                        )}
                    </Row>
                </Container>
            </section>
        </>
    );
}

export default SearchResultList;
