// src/pages/Login.js
import React, { useState } from 'react';
import { Button, Form, Header, Segment } from 'semantic-ui-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8084/api/v1/auth/login', {
        userName: username,
        password: password,
      });
      // Giriş başarılı ise kullanıcı bilgilerini localStorage'a kaydet
      localStorage.setItem('user', JSON.stringify(response.data));
      navigate('/'); // Anasayfaya yönlendir
    } catch (error) {
      setErrorMessage('Giriş işlemi sırasında bir hata oluştu.'); // Hata mesajı göster
      console.error('An error occurred while logging in:', error);
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
            value={username} 
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
