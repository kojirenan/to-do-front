import { Grid } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import BasicCard from '../components/Card';
import styled from 'styled-components';
import FormNote from '../components/FormNote';

export interface INote {
    id: number;
    title: string;
    description?: string;
    date: Date | '';
    done: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    user_id?: number;
}

const Div = styled.div`
    margin: 2rem;
    form {
        background-color: gray;
        margin: 4rem;
        padding: 2rem;
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 24px;
    }
`;

function HomeUser() {
    const [notes, setNotes] = useState<INote[]>([]);
    const [handle, setHandler] = useState('');

    const handleRequest = (newValue: string) => {
        setHandler(newValue);
    };

    const id = sessionStorage.getItem('user_id');
    const token = sessionStorage.getItem('x-access-token');

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['x-access-token'] = token;
        } else {
            delete axios.defaults.headers.common['x-access-token'];
        }

        return () => {
            delete axios.defaults.headers.common['x-access-token'];
        };
    }, [token, handle]);

    useEffect(() => {
        if (id) {
            axios
                .get<INote[]>(`https://to-do-jar3.onrender.com/users/${id}/home`)
                .then(response => setNotes(response.data))
                .catch(error => {
                    console.error('Erro ao obter as notas:', error);
                });
        }
    }, [id, handle]);

    return (
        <Div>
            <Grid container spacing={2}>
                {notes.map(note => (
                    <Grid item xs={12} sm={6} md={4} key={note.id}>
                        <BasicCard
                            id={note.id}
                            title={note.title}
                            description={note.description}
                            date={note.date}
                            done={note.done}
                        />
                    </Grid>
                ))}
            </Grid>
            <FormNote id={id} handleRequest={handleRequest} />
        </Div>
    );
}

export default HomeUser;
