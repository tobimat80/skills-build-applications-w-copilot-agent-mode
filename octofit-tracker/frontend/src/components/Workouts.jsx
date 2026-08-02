import { useEffect, useState } from 'react';
import { Card, ListGroup } from 'react-bootstrap';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        const baseUrl = import.meta.env.VITE_CODESPACE_NAME
          ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
          : 'http://localhost:8000/api/workouts/';
        const response = await fetch(baseUrl);
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
