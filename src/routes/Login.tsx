import { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

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

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const promise = axios.post('https://to-do-jar3.onrender.com/login', {
                email,
                password,
            });

            toast.promise(promise, {
                pending: 'Logando...',
                success: 'Login realizado com sucesso!',
                error: {
                    render: error => `Erro ao fazer login: ${error}`,
                    onClose: () => console.error('Erro ao fazer login'),
                },
            });

            const response = await promise;

            const id = response.data.id;
            const token = response.data.token;
            sessionStorage.setItem('user_id', id);
            sessionStorage.setItem('x-access-token', token);
            navigate(`/user/${id}/home`);
        } catch (error) {
            console.error('Erro ao fazer login:', error);
        }
    };

    return (
        <Div>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="e-mail"
                    variant="outlined"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
                <TextField
                    label="senha"
                    variant="outlined"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    type="password"
                    required
                />
                <Button variant="contained" type="submit">
                    Logar
                </Button>
            </form>
        </Div>
    );
}

export default Login;
