import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { NavLink, Outlet, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import { FaUser, FaListAlt, FaCalendar } from 'react-icons/fa'; // Import icons for navigation
import './admin.css';

const navLinks = [
  {
    path: '/admin/Admin-users-list',
    display: 'Users',
    icon: <FaUser />
  },
  {
    path: '/admin/Admin-tours-list',
    display: 'Tours',
    icon: <FaListAlt />
  },
  {
    path: '/admin/Admin-booking-list',
    display: 'Booking',
    icon: <FaCalendar />
  }
];

const AdminLayout = () => {
  const { user } = useContext(AuthContext);

  if (!user || user.role !== 'admin') {
    return <Navigate to="/" />;
  }

  return (
    <>
      <header className="header">
        <Container>
          <Row>
            <Col>
              <div className="nav__wrapper d-flex justify-content-between align-items-center">
                <div className="brand">
                  <h1>Admin Dashboard</h1>
                </div>
                <nav className="navigation">
                  <ul className="menu d-flex align-items-center gap-5">
                    {navLinks.map((item, index) => (
                      <li className="nav___item" key={index}>
                        <NavLink
                         to={item.path} className={navClass=>navClass.isActive?"active___link":""}>
                          {item.icon && <span className="icon align-items-center">{item.icon}</span>}
                          <span className="text">{item.display}</span>
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </Col>
          </Row>
        </Container>
      </header>
      <Outlet />
    </>
  );
};

export default AdminLayout;


