import { useEffect, useState } from 'react';
import { Card, ListGroup } from 'react-bootstrap';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadActivities = async () => {
      try {
        const baseUrl = import.meta.env.VITE_CODESPACE_NAME
          ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
          : 'http://localhost:8000/api/activities/';
        const response = await fetch(baseUrl);
        const data = await response.json();
        const items = Array.isArray(data) ? data : data.results ?? [];
        setActivities(items);
      } catch (error) {
        console.error('Unable to load activities', error);
      } finally {
        setLoading(false);
      }
    };

    loadActivities();
  }, []);

  return (
    <Card>
      <Card.Header as="h2">Recent activities</Card.Header>
      <ListGroup variant="flush">
        {loading ? (
          <ListGroup.Item>Loading activities...</ListGroup.Item>
        ) : activities.length === 0 ? (
          <ListGroup.Item>No activities found yet.</ListGroup.Item>
        ) : (
          activities.map((activity) => (
            <ListGroup.Item key={activity._id}>
              <strong>{activity.type}</strong> · {activity.duration} mins
              {activity.distance ? ` · ${activity.distance} km` : ''}
              <div className="text-muted">{activity.notes ?? 'No notes'}</div>
            </ListGroup.Item>
          ))
        )}
      </ListGroup>
    </Card>
  );
}

export default Activities;
