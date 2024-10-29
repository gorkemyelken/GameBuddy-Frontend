import React, { useState } from 'react';
import { Button, Form, Header, Segment } from 'semantic-ui-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    const loginData = {
      userName: userName,
      password: password
    };

    try {
      const response = await fetch('https://gamebuddy-auth-service-b40a307cb66b.herokuapp.com/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        throw new Error('Giriş işlemi başarısız!');
      }

      // Kullanıcı bilgilerini al
      const userResponse = await fetch('https://gamebuddy-user-service-04b8e7746067.herokuapp.com/api/v1/users/find?userName=' + userName);
      
      if (!userResponse.ok) {
        throw new Error('Kullanıcı bilgileri alınamadı');
      }

      const userDetails = await userResponse.json();
      console.log('Giriş başarılı', userDetails);
      
      // Kullanıcı bilgilerini localStorage'a kaydet
      localStorage.setItem('user', JSON.stringify(userDetails));
      
      // Profil sayfasına yönlendir
      navigate('/profile');
      
    } catch (error) {
      console.error('Giriş hatası:', error);
      setErrorMessage(error.message);
    }
  };

  return (
    <Segment>
      <Header as='h2' textAlign='center'>Giriş Yap</Header>
      <Form onSubmit={handleLogin} style={{ maxWidth: '400px', margin: '0 auto' }}>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <Form.Field>
          <label>Kullanıcı Adı</label>
          <input 
            type="text" 
            value={userName} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
        </Form.Field>
        <Form.Field>
          <label>Şifre</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </Form.Field>
        <Button type='submit' primary>Giriş Yap</Button>
      </Form>
    </Segment>
  );
};

export default Login;
