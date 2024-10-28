// src/pages/Register.js
import React, { useState } from 'react';
import { Button, Form, Header } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    const registerData = {
      userName: username,
      password: password,
      email: email,
    };

    try {
      const response = await fetch('http://localhost:8084/api/v1/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerData),
      });

      if (!response.ok) {
        throw new Error('Kayıt işlemi başarısız!');
      }

      console.log('Kayıt başarılı');
      navigate('/login'); // Kayıt başarılı olursa login sayfasına yönlendirin.
    } catch (error) {
      console.error('Register error:', error);
      alert('An error occurred while registering');
    }
  };

  return (
    <div>
      <Header as='h2'>Kayıt Ol</Header>
      <Form>
        <Form.Field>
          <label>Kullanıcı Adı</label>
          <input
            type='text'
            placeholder='Kullanıcı Adınızı Girin'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Şifre</label>
          <input
            type='password'
            placeholder='Şifrenizi Girin'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Email</label>
          <input
            type='email'
            placeholder='Emailinizi Girin'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Field>
        <Button primary onClick={handleRegister}>Kayıt Ol</Button>
      </Form>
    </div>
  );
};

export default Register;
