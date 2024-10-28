// src/pages/Home.js
import React, { useEffect, useState } from 'react';
import { Button, Header, Segment } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLoginRedirect = () => {
    navigate('/login'); // Giriş sayfasına yönlendir
  };

  const handleRegisterRedirect = () => {
    navigate('/register'); // Kayıt sayfasına yönlendir
  };

  return (
    <Segment textAlign='center' style={{ padding: '5em 0' }}>
      <Header as='h1'>Hoş Geldiniz!</Header>
      <p>Uygulamamızda oyun arkadaşları bulabilir ve yeni insanlarla tanışabilirsiniz.</p>
      {!isLoggedIn && (
        <>
          <Button primary onClick={handleLoginRedirect} style={{ marginRight: '1em' }}>
            Giriş Yap
          </Button>
          <Button secondary onClick={handleRegisterRedirect}>
            Kayıt Ol
          </Button>
        </>
      )}
    </Segment>
  );
};

export default Home;
