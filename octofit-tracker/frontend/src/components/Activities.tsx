import { useEffect, useState } from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import { buildApiUrl } from '../utils/api';

type Activity = {
  _id: string;
  type: string;
  duration: number;
  notes?: string;
  distance?: number;
  createdAt: string;
  userId?: {
    name?: string;
  };
};

function Activities() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadActivities = async () => {
      try {
        const response = await fetch(buildApiUrl('activities'));
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
              <div className="text-muted">
                {activity.userId?.name ?? 'Unknown user'} · {activity.notes ?? 'No notes'}
              </div>
            </ListGroup.Item>
          ))
        )}
      </ListGroup>
    </Card>
  );
}

export default Activities;
