import React, { useState } from 'react';
import axios from 'axios';

const UserSearchPage = () => {
  const [userName, setUserName] = useState('');
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    setUserName(event.target.value);
  };

  const handleSearch = async () => {
    setError(null);
    setUser(null);
    setLoading(true); // Yükleniyor durumu

    try {
      const response = await axios.get('https://gamebuddy-user-service-04b8e7746067.herokuapp.com/api/v1/users/find', {
        params: { userName: userName },
      });
      setUser(response.data);
    } catch (err) {
      setError('Kullanıcı bulunamadı veya bir hata oluştu.');
    } finally {
      setLoading(false); // Yüklenme durumu bitti
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Kullanıcı Ara</h1>
      <input
        type="text"
        value={userName}
        onChange={handleInputChange}
        placeholder="Kullanıcı Adını Girin"
        style={{ padding: '8px', fontSize: '16px' }}
      />
      <button onClick={handleSearch} style={{ padding: '8px 16px', marginLeft: '8px' }}>
        Ara
      </button>

      {loading && <p>Yükleniyor...</p>} {/* Yüklenme durumu göstergesi */}

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {user && (
        <div style={{ marginTop: '20px' }}>
          <h2>Kullanıcı Bilgileri:</h2>
          <p><strong>Kullanıcı Adı:</strong> {user.userName}</p>
          <p><strong>Email:</strong> {user.email}</p>
          {/* Diğer kullanıcı bilgilerini buraya ekleyebilirsiniz */}
        </div>
      )}
    </div>
  );
};

export default UserSearchPage;
