// src/pages/Matchmaking.js
import React from "react";
import { Container, Header, Segment, Button, List, Divider } from "semantic-ui-react";

function Matchmaking() {
  // Örnek oyuncu listesi (gerçek uygulamada bu veriler API'den alınabilir)
  const players = [
    { id: 1, username: "Player1", rank: "Silver", status: "Available" },
    { id: 2, username: "Player2", rank: "Gold", status: "Available" },
    { id: 3, username: "Player3", rank: "Platinum", status: "In a Game" },
    { id: 4, username: "Player4", rank: "Gold", status: "Available" },
  ];

  return (
    <Container>
      <Segment>
        <Header as="h2" textAlign="center">
          Matchmaking
        </Header>
        <Divider />
        <Header as="h3" textAlign="center">
          Available Players
        </Header>
      </Segment>

      <Segment>
        <List divided relaxed>
          {players.map((player) => (
            <List.Item key={player.id}>
              <List.Content>
                <List.Header>{player.username}</List.Header>
                <List.Description>
                  Rank: {player.rank} | Status: {player.status}
                </List.Description>
              </List.Content>
              <Button primary style={{ marginLeft: "10px" }}>
                Invite to Game
              </Button>
            </List.Item>
          ))}
        </List>
      </Segment>
    </Container>
  );
}

export default Matchmaking;
