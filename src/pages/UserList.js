// src/pages/UserList.js
import React, { useEffect, useState } from 'react';
import { Table, Header, Segment, Loader } from 'semantic-ui-react';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://gamebuddy-user-service-04b8e7746067.herokuapp.com/api/v1/users');
        setUsers(response.data);
      } catch (error) {
        setError('Kullanıcıları yüklerken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <Segment>
        <Loader active inline='centered' />
        <Header as='h3' textAlign='center'>Kullanıcılar Yükleniyor...</Header>
      </Segment>
    );
  }

  if (error) {
    return (
      <Segment>
        <Header as='h4' color='red'>{error}</Header>
      </Segment>
    );
  }

  const formatDateArray = (dateArray) => {
    return new Date(...dateArray);
  };

  return (
    <Segment>
      <Header as='h2' textAlign='center'>Kullanıcı Listesi</Header>
      <Table celled striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>ID</Table.HeaderCell>
            <Table.HeaderCell>Kullanıcı Adı</Table.HeaderCell>
            <Table.HeaderCell>E-posta</Table.HeaderCell>
            <Table.HeaderCell>Cinsiyet</Table.HeaderCell>
            <Table.HeaderCell>Yaş</Table.HeaderCell>
            <Table.HeaderCell>Premium</Table.HeaderCell>
            <Table.HeaderCell>Oluşturulma Tarihi</Table.HeaderCell>
            <Table.HeaderCell>Güncellenme Tarihi</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {users.map((user) => {
            // createdAt dizisini uygun formata çevir
            const createdAtDate = user.createdAt ? formatDateArray(user.createdAt) : null;
            const formattedCreatedAt = createdAtDate ? createdAtDate.toLocaleString() : 'Geçersiz Tarih';

            // updatedAt kontrolü
            const updatedAtDisplay = user.updatedAt ? '-' : '-';

            return (
              <Table.Row key={user.id}>
                <Table.Cell>{user.id}</Table.Cell>
                <Table.Cell>{user.userName}</Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>{user.gender}</Table.Cell>
                <Table.Cell>{user.age}</Table.Cell>
                <Table.Cell>{user.premium ? 'Evet' : 'Hayır'}</Table.Cell>
                <Table.Cell>{formattedCreatedAt}</Table.Cell>
                <Table.Cell>{updatedAtDisplay}</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </Segment>
  );
};

export default UserList;
