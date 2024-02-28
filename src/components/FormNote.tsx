import { Button, TextField } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';

function FormNote({
    id,
    handleRequest,
}: {
    id: string | null;
    handleRequest: (handle: string) => void;
}) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState<string | null>('');

    console.log(`Title: ${title}, Description: ${description}, Date: ${date}`);

    const handleSubmit = async (e: React.FormEvent) => {
        if (date == '') setDate(null);
        e.preventDefault();
        try {
            const requestData = {
                title,
                description: description || null,
                date: date || null,
            };

            axios
                .post(`https://to-do-jar3.onrender.com/users/${id}/home`, requestData)
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
        <form onSubmit={handleSubmit}>
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
        </form>
    );
}

export default FormNote;
