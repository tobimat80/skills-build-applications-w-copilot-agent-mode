import { useEffect, useState } from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import { buildApiUrl } from '../utils/api';

type User = {
  _id: string;
  name: string;
  email: string;
  fitnessLevel: string;
  points: number;
};

function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await fetch(buildApiUrl('users'));
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
