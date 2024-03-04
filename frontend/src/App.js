require('dotenv').config();
import GlobalStyle from './styles/global';
import { toast, ToastContainer } from 'react-toastify';
import Form from './components/Form';
import Grid from "./components/Grid";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import { useEffect, useState } from 'react';
import axios from 'axios';

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Title = styled.h2``;

function App() {
  const [users, setUsers] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getUsers = async () => {
    try {
      const res = await axios.get(`${process.env.API_BASE_URL}`); //busca os usuários
      setUsers(res.data.sort((a,b) => (a.nome > b.nome ? 1 : -1))); //ordena os usuários pelo nome
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, [setUsers]);

  return (
    <>
      <Container>
        <Title>USUÁRIOS</Title>
        <Form onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers}/>
        <Grid setOnEdit={setOnEdit} users={users} setUsers={setUsers}/>
      </Container>
      <ToastContainer autoClose={3000} position='bottom-left'/>
      <GlobalStyle />
    </>
  );
}

export default App;
