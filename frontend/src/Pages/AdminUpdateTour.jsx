
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { BASE_URL } from '../utils/config';
import tourValidation from '../Validation/tourValidation';

const AdminUpdateTour = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({
    title: '',
    city: '',
    address: '',
    distance: '',
    photo: '',
    desc: '',
    price: '',
    maxGroupSize: '',
    featured: false,
  });
  const [photoFileName, setPhotoFileName] = useState('');
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    const val = type === 'checkbox' ? checked : type === 'file' ? files[0] : value;
    setData(prevData => ({
      ...prevData,
      [name]: val
    }));

    if (type === 'file') {
      setPhotoFileName(files[0].name);
    }
  };

  useEffect(() => {
    const fetchTourData = async () => {
      try {
        const res = await fetch(`${BASE_URL}/tours/${id}`, {
          credentials: 'include',
        });
        if (res.ok) {
          const result = await res.json();
          setData(result.data);
          const fileName = result.data.photo.split('/').pop();
          setPhotoFileName(fileName);
        } else {
          throw new Error('Failed to fetch tour data');
        }
      } catch (err) {
        console.error('Fetch error:', err);
        alert(err.message);
      }
    };

    fetchTourData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = tourValidation(data);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const formDataToSend = new FormData();
        formDataToSend.append('title', data.title);
        formDataToSend.append('city', data.city);
        formDataToSend.append('address', data.address);
        formDataToSend.append('distance', data.distance);
        formDataToSend.append('desc', data.desc);
        formDataToSend.append('price', data.price);
        formDataToSend.append('maxGroupSize', data.maxGroupSize);
        formDataToSend.append('featured', data.featured);

        if (data.photo instanceof File) {
          formDataToSend.append('photo', data.photo); // Only append the file if it's a new one
        }

        const res = await fetch(`${BASE_URL}/tours/${id}`, {
          method: 'PUT',
          credentials: 'include',
          body: formDataToSend,
        });

        if (res.ok) {
          alert('Tour updated successfully');
          navigate('/admin/Admin-tours-list');
        } else {
          throw new Error('Failed to update tour');
        }
      } catch (err) {
        alert(err.message);
      }
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h2>Update Tour</h2>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="title">Title:</Label>
              <Input type="text" name="title" id="title" value={data.title} onChange={handleChange} />
              {errors.title && <p style={{ color: "red" }}>{errors.title}</p>}
            </FormGroup>
            <FormGroup>
              <Label for="city">City:</Label>
              <Input type="text" name="city" id="city" value={data.city} onChange={handleChange} />
              {errors.city && <p style={{ color: "red" }}>{errors.city}</p>}
            </FormGroup>
            <FormGroup>
              <Label for="address">Address:</Label>
              <Input type="text" name="address" id="address" value={data.address} onChange={handleChange} />
              {errors.address && <p style={{ color: "red" }}>{errors.address}</p>}
            </FormGroup>
            <FormGroup>
              <Label for="distance">Distance:</Label>
              <Input type="number" name="distance" id="distance" value={data.distance} onChange={handleChange} />
              {errors.distance && <p style={{ color: "red" }}>{errors.distance}</p>}
            </FormGroup>
            <FormGroup>
              <Label for="photo">Photo:</Label>
              <Input type="file" name="photo" id="photo" onChange={handleChange} />
              {photoFileName && <p>Current Photo: {photoFileName}</p>}
              {errors.photo && <p style={{ color: "red" }}>{errors.photo}</p>}
            </FormGroup>
            <FormGroup>
              <Label for="desc">Description:</Label>
              <Input type="textarea" name="desc" id="desc" value={data.desc} onChange={handleChange} />
              {errors.desc && <p style={{ color: "red" }}>{errors.desc}</p>}
            </FormGroup>
            <FormGroup>
              <Label for="price">Price:</Label>
              <Input type="number" name="price" id="price" value={data.price} onChange={handleChange} />
              {errors.price && <p style={{ color: "red" }}>{errors.price}</p>}
            </FormGroup>
            <FormGroup>
              <Label for="maxGroupSize">Max Group Size:</Label>
              <Input type="number" name="maxGroupSize" id="maxGroupSize" value={data.maxGroupSize} onChange={handleChange} />
              {errors.maxGroupSize && <p style={{ color: "red" }}>{errors.maxGroupSize}</p>}
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input type="checkbox" name="featured" checked={data.featured} onChange={handleChange} />
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

export default AdminUpdateTour;

