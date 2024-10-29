// src/pages/Profile.js
import React, { useEffect, useState } from 'react';
import { Header, Segment, List, Image } from 'semantic-ui-react';

const Profile = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [gameStats, setGameStats] = useState([]);
  
  // Kullanıcı bilgilerini localStorage'dan al
  const userInfoFromStorage = JSON.parse(localStorage.getItem('user'));
  
  useEffect(() => {
    if (userInfoFromStorage) {
      setUserInfo(userInfoFromStorage);
      fetchGameStats(userInfoFromStorage.id); // Kullanıcı ID'si ile oyun istatistiklerini çek
    }
  }, [userInfoFromStorage]);

  // Oyun istatistiklerini almak için API çağrısı
  const fetchGameStats = async (userId) => {
    try {
      const response = await fetch(`https://gamebuddy-game-service-1355a6fbfb17.herokuapp.com/api/v1/gamestats/user/${userId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP hata! Status: ${response.status}`);
      }

      const data = await response.json();
      setGameStats(data);
    } catch (error) {
      console.error('Fetch hata:', error.message);
    }
  };

  if (!userInfo) return <p>Loading...</p>; // Veriler yüklenene kadar bekle

  return (
    <Segment>
      <Header as='h2' textAlign='center'>Profil Bilgileri</Header>
      {userInfo.profilePhoto ? (
        <Image src={userInfo.profilePhoto} alt="Profile" size='small' circular centered />
      ) : (
        <Image src='/path/to/default/profile/photo.jpg' alt="Default Profile" size='small' circular centered />
      )}
      <List>
        <List.Item>
          <strong>Kullanıcı Adı:</strong> {userInfo.userName}
        </List.Item>
        <List.Item>
          <strong>E-posta:</strong> {userInfo.email}
        </List.Item>
        <List.Item>
          <strong>Cinsiyet:</strong> {userInfo.gender === 'MALE' ? 'Erkek' : 'Kadın'}
        </List.Item>
        <List.Item>
          <strong>Yaş:</strong> {userInfo.age}
        </List.Item>
        <List.Item>
          <strong>Premium Üyelik:</strong> {userInfo.premium ? 'Evet' : 'Hayır'}
        </List.Item>
      </List>

      <Header as='h3' textAlign='center'>Oyun İstatistikleri</Header>
      {gameStats.length > 0 ? (
        <List>
          {gameStats.map(stat => (
            <List.Item key={stat.id}>
              Oyun ID: {stat.gameId}, Rütbe: {stat.gameRank}
            </List.Item>
          ))}
        </List>
      ) : (
        <p>Oyun istatistikleri bulunamadı.</p>
      )}
    </Segment>
  );
};

export default Profile;
