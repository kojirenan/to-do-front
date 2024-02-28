import { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Form = styled.form`
    max-width: 1350px;
    display: flex;
    flex-direction: column;
    gap: 24px;

    input {
        width: 20rem;
    }
`;

function CreateUser() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post('https://to-do-jar3.onrender.com/users/create', {
                email,
                password,
            });
            navigate('/');
        } catch (error) {
            console.error('Erro ao criar conta:', error);
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
                Criar conta
            </Button>
        </Form>
    );
}

export default CreateUser;