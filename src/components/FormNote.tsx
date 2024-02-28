import { Button, TextField } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';

const Form = styled.form`
    position: absolute;
    min-width: 400px;
    bottom: 50px;
    right: 0px;
`;

function FormNote({
    id,
    handleRequest,
    visible,
}: {
    id: string | null;
    handleRequest: (handle: string) => void;
    visible: boolean;
}) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState<string | null>('');

    const handleSubmit = async (e: React.FormEvent) => {
        if (date == '') setDate(null);
        e.preventDefault();
        try {
            const requestData = {
                title,
                description: description || null,
                date: date || null,
            };

            const promise = axios.post(
                `https://to-do-jar3.onrender.com/users/${id}/home`,
                requestData
            );

            toast.promise(promise, {
                pending: 'Criando atividade...',
                success: 'Atividade criada!',
                error: {
                    render: error => `Erro ao criar atividade: ${error}`,
                    // Ação personalizada após um erro
                    onClose: () => console.error('Erro ao obter criar atividade'),
                },
            });

            promise
                .then(res => handleRequest(`${res.data.id}`))
                .catch(err => console.error('Erro ao enviar os dados: ', err));

            setTitle('');
            setDescription('');
            setDate('');
        } catch (error) {
            console.error('Erro ao fazer login:', error);
        }
    };

    return (
        <>
            {visible && (
                <Form onSubmit={handleSubmit}>
                    <TextField
                        label="Título"
                        variant="outlined"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        required
                    />
                    <TextField
                        label="Descrição"
                        variant="outlined"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />

                    <TextField
                        id="outlined-date"
                        label="Concluir em"
                        type="datetime-local"
                        value={date}
                        onChange={e => setDate(e.target.value)}
                        variant="outlined"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <Button variant="contained" type="submit">
                        Novo
                    </Button>
                </Form>
            )}
        </>
    );
}

export default FormNote;
