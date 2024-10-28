// src/pages/Profile.js
import React from 'react';
import { Card, Image, Header, Segment, List, Divider } from 'semantic-ui-react';

const Profile = () => {
  // Local storage'dan kullanıcı bilgisini al
  const user = JSON.parse(localStorage.getItem('user'));

  // Kullanıcı bilgileri yoksa bir mesaj göster
  if (!user) {
    return <p>Kullanıcı bilgileri bulunamadı. Lütfen giriş yapın.</p>;
  }

  return (
    <Segment style={{ padding: '2em 0' }}>
      <Header as='h2' textAlign='center'>Profil Bilgileriniz</Header>
      <Card centered>
        <Image 
          src={user.profilePhoto || 'https://via.placeholder.com/150'} 
          wrapped 
          ui={false} 
          alt="Profil Resmi" 
          style={{ borderRadius: '50%', margin: '1em 0' }} 
        />
        <Card.Content>
          <Card.Header>{user.userName}</Card.Header> {/* Kullanıcı adını en üste ekledik */}
          <Card.Meta>
            <List>
              <List.Item>Email: {user.email}</List.Item>
              <List.Item>Cinsiyet: {user.gender}</List.Item>
              <List.Item>Yaş: {user.age}</List.Item>
              <List.Item>
                Üyelik Durumu: {user.isPremium ? 'Premium Üye' : 'Standart Üye'}
              </List.Item>
            </List>
          </Card.Meta>
          <Divider />
          <Card.Description>
            <List>
              <List.Item>
                Üyelik Tarihi: {new Date(user.createdAt).toLocaleDateString()}
              </List.Item>
              <List.Item>
                Son Güncelleme: {user.updatedAt ? new Date(user.updatedAt).toLocaleDateString() : '-'}
              </List.Item>
            </List>
          </Card.Description>
        </Card.Content>
      </Card>
    </Segment>
  );
};

export default Profile;
