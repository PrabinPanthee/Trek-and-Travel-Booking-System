import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../utils/config';
import { Container } from 'reactstrap';
import '../style/AdminBookingList.css';

const AdminBookingList = () => {
  const [booking, setBooking] = useState([]);

  useEffect(() => {
    const fetchUserBookingData = async () => {
      try {
        const res = await fetch(`${BASE_URL}/booking`, {
          credentials: 'include',
        });
        const result = await res.json();
        console.log('Fetched booking data:', result.data); // Debugging
        setBooking(result.data);
      } catch (err) {
        alert(err.message);
      }
    };

    fetchUserBookingData();
  }, []);

  return (
    <section>
      <Container>
        <div className="table-container">
          <h2>List Of Users</h2>
          <table className="table-custom">
            <thead>
              <tr>
                <th>UserEmail</th>
                <th>Tour Name</th>
                <th>Full Name</th>
                <th>Guest Size</th>
                <th>Phone</th>
                <th>Price/person</th>
                <th>Total Amount</th>
                <th>Payment Method</th>
                <th>Status</th>
                <th>Booked At</th>
              </tr>
            </thead>
            <tbody>
              {booking.map((book) => (
                <tr key={book._id}>
                  <td>{book.userEmail}</td>
                  <td>{book.tourName}</td>
                  <td>{book.fullName}</td>
                  <td>{book.guestSize}</td>
                  <td>{book.phone}</td>
                  <td>{book.price}</td>
                  <td>{book.totalAmount}</td>
                  <td className={book.payment_details.paymentMethod === 'khalti' ? 'green-italic khalti-cell' : 'green-italic'}>{book.payment_details.paymentMethod}</td>
                  <td className={book.payment_details.status === 'paid' ? 'green-italic paid-cell' : book.payment_details.status === 'failed' ? 'red-italic unpaid-cell' : ''}>{book.payment_details.status}</td>
                  <td>{new Date(book.bookAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </section>
  );
}

export default AdminBookingList;
