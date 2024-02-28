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
            </Div>
        </>
    );
}

export default Home;
