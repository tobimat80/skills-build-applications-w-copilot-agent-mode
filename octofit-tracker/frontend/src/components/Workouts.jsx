import { useEffect, useState } from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import { buildApiUrl } from '../utils/api';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        const response = await fetch(buildApiUrl('workouts'));
        const data = await response.json();
        const items = Array.isArray(data) ? data : data.results ?? [];
        setWorkouts(items);
      } catch (error) {
        console.error('Unable to load workouts', error);
      } finally {
        setLoading(false);
      }
    };

    loadWorkouts();
  }, []);

  return (
    <Card>
      <Card.Header as="h2">Suggested workouts</Card.Header>
      <ListGroup variant="flush">
        {loading ? (
          <ListGroup.Item>Loading workouts...</ListGroup.Item>
        ) : workouts.length === 0 ? (
          <ListGroup.Item>No workout suggestions available.</ListGroup.Item>
        ) : (
          workouts.map((workout) => (
            <ListGroup.Item key={workout._id}>
              <strong>{workout.title}</strong> · {workout.difficulty}
              <div className="text-muted">{workout.duration} · {workout.focus}</div>
            </ListGroup.Item>
          ))
        )}
      </ListGroup>
    </Card>
  );
}

export default Workouts;
