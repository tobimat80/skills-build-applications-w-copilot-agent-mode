import { useEffect, useState } from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import { buildApiUrl } from '../utils/api';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        const response = await fetch(buildApiUrl('leaderboard'));
        const data = await response.json();
        const items = Array.isArray(data) ? data : data.results ?? [];
        setEntries(items);
      } catch (error) {
        console.error('Unable to load leaderboard', error);
      } finally {
        setLoading(false);
      }
    };

    loadLeaderboard();
  }, []);

  return (
    <Card>
      <Card.Header as="h2">Leaderboard</Card.Header>
      <ListGroup variant="flush">
        {loading ? (
          <ListGroup.Item>Loading leaderboard...</ListGroup.Item>
        ) : entries.length === 0 ? (
          <ListGroup.Item>No leaderboard entries available.</ListGroup.Item>
        ) : (
          entries.map((entry, index) => (
            <ListGroup.Item key={entry._id}>
              <strong>#{index + 1}</strong> {entry.name} — {entry.points} pts · {entry.fitnessLevel}
            </ListGroup.Item>
          ))
        )}
      </ListGroup>
    </Card>
  );
}

export default Leaderboard;
