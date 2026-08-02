import { useEffect, useState } from 'react';
import { Card, ListGroup } from 'react-bootstrap';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const baseUrl = import.meta.env.VITE_CODESPACE_NAME
          ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
          : 'http://localhost:8000/api/users/';
        const response = await fetch(baseUrl);
        const data = await response.json();
        const items = Array.isArray(data) ? data : data.results ?? [];
        setUsers(items);
      } catch (error) {
        console.error('Unable to load users', error);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  return (
    <Card>
      <Card.Header as="h2">Users</Card.Header>
      <ListGroup variant="flush">
        {loading ? (
          <ListGroup.Item>Loading users...</ListGroup.Item>
        ) : users.length === 0 ? (
          <ListGroup.Item>No users found yet.</ListGroup.Item>
        ) : (
          users.map((user) => (
            <ListGroup.Item key={user._id}>
              <strong>{user.name}</strong> — {user.fitnessLevel} · {user.points} pts
              <div className="text-muted">{user.email}</div>
            </ListGroup.Item>
          ))
        )}
      </ListGroup>
    </Card>
  );
}

export default Users;
