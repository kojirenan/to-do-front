import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import './App.css';

const Div = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 48px;
    margin: 24rem 0;
`;

function App() {
    const navigate = useNavigate();
    return (
        <>
            <h1>Bem vindo ao To-Do</h1>

            <Div>
                <Button variant="outlined" onClick={() => navigate('/login')}>
                    Login
                </Button>
                <Button variant="outlined" onClick={() => navigate('/create')}>
                    Criar nova conta
                </Button>
            </Div>
            <p>Esse é um projeto criado para o Desafio Yssy</p>
            <p>Desenvolvido por Renan Koji Hanashiro: ME CONTRATA YSSY!</p>
        </>
    );
}

export default App;
