import { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import { Button, TextField } from '@mui/material';

const Form = styled.form`
    max-width: 1350px;
    display: flex;
    flex-direction: column;
    gap: 24px;

    input {
        width: 20rem;
    }
`;

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://to-do-jar3.onrender.com/login', {
                email,
                password,
            });

            // pegar id para direcionamento

            //const id = response.data.id;
            const token = response.data.token;
            sessionStorage.setItem('x-access-token', token);
        } catch (error) {
            console.error('Erro ao fazer login:', error);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <TextField
                id="outlined-basic"
                label="e-mail"
                variant="outlined"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            <TextField
                id="outlined-basic"
                label="senha"
                variant="outlined"
                value={password}
                onChange={e => setPassword(e.target.value)}
                type="password"
            />
            <Button variant="contained" type="submit">
                Logar
            </Button>
        </Form>
    );
}

export default Login;
