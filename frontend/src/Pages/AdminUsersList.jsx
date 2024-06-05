import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/authContext';
import { BASE_URL } from '../utils/config';
import { Container, Table, Button } from 'reactstrap';

const AdminUsersList = () => {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/users`, {
          credentials: 'include', // Include cookies for session-based authentication
        });
        const data = await response.json();
        setUsers(data.data);

      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    if (user) {
      fetchUserData();
    }
  }, [user]);

  const handleRemoveUser = async (userId) => {
    try {
      const response = await fetch(`${BASE_URL}/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });
      if (response.ok) {
        // Remove the user from the state
        setUsers(users.filter((user) => user._id !== userId));
        alert('User removed successfully');
      } else {
        throw new Error('Failed to remove user');
      }
    } catch (error) {
      console.error('Remove user error:', error);
    }
  };

  return (
    <section>
      <Container>
        <div className="mt-0">
          <h2>List Of Users</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Email</th>
                <th>Username</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.email}</td>
                  <td>{user.username}</td>
                  {user.role !== 'admin' && (
                    <td>
                      <Button color="danger" onClick={() => handleRemoveUser(user._id)}>Remove</Button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Container>
    </section>
  );
};

export default AdminUsersList;

