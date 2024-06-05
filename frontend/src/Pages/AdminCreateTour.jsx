import React, { useState } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { BASE_URL } from '../utils/config';
import { useNavigate } from 'react-router-dom';
import tourCreatingValidation from '../Validation/tourCreatingValidation';

const AdminCreateTour = () => {
  const [formData, setFormData] = useState({
    title: '',
    city: '',
    address: '',
    distance: '',
    photo: null,
    desc: '',
    price: '',
    maxGroupSize: '',
    featured: false,
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    const val = type === 'checkbox' ? checked : type === 'file' ? files[0] : value;
    setFormData(prevData => ({
      ...prevData,
      [name]: val
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('city', formData.city);
    formDataToSend.append('address', formData.address);
    formDataToSend.append('distance', formData.distance);
    formDataToSend.append('desc', formData.desc);
    formDataToSend.append('price', formData.price);
    formDataToSend.append('maxGroupSize', formData.maxGroupSize);
    formDataToSend.append('featured', formData.featured);
    if (formData.photo) {
      formDataToSend.append('photo', formData.photo);
    }

    const validationErrors = tourCreatingValidation(formDataToSend);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const res = await fetch(`${BASE_URL}/tours`, {
          method: 'POST',
          credentials: 'include',
          body: formDataToSend,
        });
        if (res.ok) {
          navigate('/admin');
        } else {
          const error = await res.json();
          alert(error.message);
        }
      } catch (err) {
        alert(err.message);
      }

      setFormData({
        title: '',
        city: '',
        address: '',
        distance: '',
        photo: null,
        desc: '',
        price: '',
        maxGroupSize: '',
        featured: false,
      });
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h2>Create New Tour</h2>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="title">Title:</Label>
              <Input
                type="text"
                name="title"
                id="title"
                value={formData.title}
                onChange={handleChange}
              />
              {errors.title && <p style={{ color: 'red' }}>{errors.title}</p>}
            </FormGroup>
            <FormGroup>
              <Label for="city">City:</Label>
              <Input
                type="text"
                name="city"
                id="city"
                value={formData.city}
                onChange={handleChange}
              />
              {errors.city && <p style={{ color: 'red' }}>{errors.city}</p>}
            </FormGroup>
            <FormGroup>
              <Label for="address">Address:</Label>
              <Input
                type="text"
                name="address"
                id="address"
                value={formData.address}
                onChange={handleChange}
              />
              {errors.address && <p style={{ color: 'red' }}>{errors.address}</p>}
            </FormGroup>
            <FormGroup>
              <Label for="distance">Distance:</Label>
              <Input
                type="number"
                name="distance"
                id="distance"
                value={formData.distance}
                onChange={handleChange}
              />
              {errors.distance && <p style={{ color: 'red' }}>{errors.distance}</p>}
            </FormGroup>
            <FormGroup>
              <Label for="photo">Photo:</Label>
              <Input
                type="file"
                name="photo"
                id="photo"
                onChange={handleChange}
              />
              {errors.photo && <p style={{ color: 'red' }}>{errors.photo}</p>}
            </FormGroup>
            <FormGroup>
              <Label for="desc">Description:</Label>
              <Input
                type="textarea"
                name="desc"
                id="desc"
                value={formData.desc}
                onChange={handleChange}
              />
              {errors.desc && <p style={{ color: 'red' }}>{errors.desc}</p>}
            </FormGroup>
            <FormGroup>
              <Label for="price">Price:</Label>
              <Input
                type="number"
                name="price"
                id="price"
                value={formData.price}
                onChange={handleChange}
              />
              {errors.price && <p style={{ color: 'red' }}>{errors.price}</p>}
            </FormGroup>
            <FormGroup>
              <Label for="maxGroupSize">Max Group Size:</Label>
              <Input
                type="number"
                name="maxGroupSize"
                id="maxGroupSize"
                value={formData.maxGroupSize}
                onChange={handleChange}
              />
              {errors.maxGroupSize && <p style={{ color: 'red' }}>{errors.maxGroupSize}</p>}
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                />
                Featured
              </Label>
            </FormGroup>
            <Button type="submit">Submit</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminCreateTour;



