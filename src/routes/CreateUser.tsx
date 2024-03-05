import { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const darkTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#1B1A17',
        },
    },
});

const Div = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;

    form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 48px;

        input {
            min-width: 20rem;
        }
    }
`;

function CreateUser() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const promise = axios.post('https://to-do-jar3.onrender.com/users/create', {
                email,
                password,
            });
            toast.promise(promise, {
                pending: 'Criando usuário...',
                success: 'Usuário criado!',
                error: {
                    render: error => `Erro ao criar usuário: ${error}`,
                    onClose: () => console.error('Erro ao criar usuário'),
                },
            });

            navigate('/');
        } catch (error) {
            console.error('Erro ao criar conta:', error);
        }
    };

    return (
        <Div>
            <ThemeProvider theme={darkTheme}>
                <form onSubmit={handleSubmit}>
                    <TextField
                        id="outlined-basic"
                        label="e-mail"
                        variant="outlined"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                    <TextField
                        id="outlined-basic"
                        label="senha"
                        variant="outlined"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                        required
                    />
                    <Button variant="contained" type="submit">
                        Criar conta
                    </Button>
                </form>
            </ThemeProvider>
        </Div>
    );
}

export default CreateUser;
