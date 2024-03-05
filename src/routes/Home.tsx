import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Button } from '@mui/material';

const Div = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 48px;
    height: 100%;
    color: black;

    button {
        min-width: 20rem;
    }
`;

function Home() {
    const navigate = useNavigate();
    return (
        <>
            <Div>
                <Button variant="outlined" onClick={() => navigate('/login')}>
                    Login
                </Button>
                <Button variant="outlined" onClick={() => navigate('/create')}>
                    Criar nova conta
                </Button>
                Esse é um projeto criado para o Desafio Yssy
                <br />
                Desenvolvido por Renan Koji Hanashiro: ME CONTRATA YSSY!
            </Div>
        </>
    );
}

export default Home;
