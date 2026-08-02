import { useEffect, useState } from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import { buildApiUrl } from '../utils/api';

type Team = {
  _id: string;
  name: string;
  points: number;
  members?: Array<{ name?: string }>;
};

function Teams() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTeams = async () => {
      try {
        const response = await fetch(buildApiUrl('teams'));
        const data = await response.json();
        const items = Array.isArray(data) ? data : data.results ?? [];
        setTeams(items);
      } catch (error) {
        console.error('Unable to load teams', error);
      } finally {
        setLoading(false);
      }
    };

    loadTeams();
  }, []);

  return (
    <Card>
      <Card.Header as="h2">Teams</Card.Header>
      <ListGroup variant="flush">
        {loading ? (
          <ListGroup.Item>Loading teams...</ListGroup.Item>
        ) : teams.length === 0 ? (
          <ListGroup.Item>No teams found yet.</ListGroup.Item>
        ) : (
          teams.map((team) => (
            <ListGroup.Item key={team._id}>
              <strong>{team.name}</strong> · {team.points} pts
              <div className="text-muted">
                {team.members?.map((member) => member.name).filter(Boolean).join(', ') || 'No members'}
              </div>
            </ListGroup.Item>
          ))
        )}
      </ListGroup>
    </Card>
  );
}

export default Teams;
