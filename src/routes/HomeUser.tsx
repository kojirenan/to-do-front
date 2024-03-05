import { Fab, Grid } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';

import BasicCard from '../components/Card';
import styled from 'styled-components';
import FormNote from '../components/FormNote';
import TableRowsIcon from '@mui/icons-material/TableRows';
import { toast } from 'react-toastify';

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
        background-color: #2f2e2c;
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
    const [visible, setVisible] = useState(false);

    const visibleToggle = () => {
        setVisible(!visible);
    };

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
            const promise = axios.get<INote[]>(
                `https://to-do-jar3.onrender.com/users/${id}/home`
            );

            toast.promise(promise, {
                pending: 'Buscando lista...',
                error: {
                    render: error => `Erro ao obter as listas: ${error}`,
                    // Ação personalizada após um erro
                    onClose: () => console.error('Erro ao obter as listas'),
                },
            });

            promise
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
                    <Grid item xs={12} key={note.id}>
                        <BasicCard
                            id={note.id}
                            title={note.title}
                            description={note.description}
                            date={note.date}
                            done={note.done}
                            user_id={note.user_id}
                            handleRequest={handleRequest}
                        />
                    </Grid>
                ))}
            </Grid>
            <FormNote id={id} handleRequest={handleRequest} visible={visible} />
            <Fab
                aria-label="Adionar tarefa"
                variant="extended"
                sx={{
                    position: 'absolute',
                    bottom: 50,
                    right: 60,
                    backgroundColor: '#2F2E2C',
                    color: 'white',
                    boxShadow: 'none',
                    borderRadius: '10px',
                    '&:hover': {
                        backgroundColor: '#878072',
                    },
                }}
                onClick={visibleToggle}
            >
                <TableRowsIcon /> Nova Tarefa
            </Fab>
        </Div>
    );
}

export default HomeUser;
