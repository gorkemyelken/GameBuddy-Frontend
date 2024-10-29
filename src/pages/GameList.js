import React, { useEffect, useState } from 'react';
import { Container, Header, List, Loader, Message, Card } from 'semantic-ui-react';

const GameList = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch('https://gamebuddy-game-service-1355a6fbfb17.herokuapp.com/api/v1/games', {
          method: 'GET',
          headers: {
            'Accept': '*/*',
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setGames(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  if (loading) {
    return (
      <Container text>
        <Loader active inline='centered' />
      </Container>
    );
  }

  if (error) {
    return (
      <Container text>
        <Message negative>
          <Message.Header>Error fetching games</Message.Header>
          <p>{error}</p>
        </Message>
      </Container>
    );
  }

  return (
    <Container>
      <Header as='h1' textAlign='center'>Game List</Header>
      <Card.Group centered>
        {games.map(game => (
          <Card key={game.id} raised>
            <Card.Content>
              <Card.Header>{game.name}</Card.Header>
              <Card.Meta>{game.category}</Card.Meta>
              <Card.Description>
                <Header as='h4'>Rank System:</Header>
                <List bulleted>
                  {game.rankSystem.map((rank, index) => (
                    <List.Item key={index}>{rank}</List.Item>
                  ))}
                </List>
              </Card.Description>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    </Container>
  );
};

export default GameList;
