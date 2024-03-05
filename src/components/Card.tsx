import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { INote } from '../routes/HomeUser';
import { TextField } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function BasicCard({
    id,
    title,
    description,
    date,
    done,
    user_id,
    handleRequest,
}: INote & { handleRequest: (handle: string) => void }) {
    const formatedDate = date != null ? new Date(date) : '';
    const limitDate =
        date != null
            ? formatedDate.toLocaleString('pt-BR', {
                  day: '2-digit',
                  month: '2-digit',
                  year: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
              })
            : '';

    const [editable, setEditable] = useState(false);

    const [titleUpdate, setTitleUpdate] = useState(title);
    const [descriptionUpdate, setDescriptionUpdate] = useState(description);

    const updateNote = () => {
        console.log('Função executou: ', titleUpdate, descriptionUpdate);
        try {
            const randomNumber = Math.floor(Math.random() * 100) + 1;
            const requestData = {
                id,
                titleUpdate,
                description: descriptionUpdate || null,
            };

            const promise = axios.put(
                `https://to-do-jar3.onrender.com/users/${user_id}/home`,
                requestData
            );

            toast.promise(promise, {
                pending: 'Alterando atividade...',
                success: 'Atividade alterada!',
                error: {
                    render: error => `Erro ao alterar a atividade: ${error}`,
                    // Ação personalizada após um erro
                    onClose: () => console.error('Erro ao alterar atividade'),
                },
            });

            promise
                .then(res => {
                    console.log(res.data);
                    handleRequest(`${randomNumber}`);
                    handleEditableToggle();
                })
                .catch(err => console.error('Erro ao enviar os dados: ', err));
        } catch (error) {
            console.error('Erro ao fazer login:', error);
        }
    };

    const deleteNote = () => {
        try {
            const randomNumber = Math.floor(Math.random() * 100) + 1;
            const promise = axios.delete(
                `https://to-do-jar3.onrender.com/users/${user_id}/home`,
                {
                    data: { id },
                }
            );

            toast.promise(promise, {
                pending: 'Deletando atividade...',
                success: 'Atividade deletada!!!',
                error: {
                    render: error => `Erro ao deletar atividade: ${error}`,
                    onClose: () => console.error('Erro ao deletar atividade'),
                },
            });

            promise
                .then(res => {
                    handleRequest(`${randomNumber}`);
                    console.log(res.data);
                })
                .catch(err => console.error('Erro ao excluir atividade: ', err));
        } catch (error) {
            console.error('Erro ao excluir a atividade', error);
        }
    };

    const handleEditableToggle = () => {
        setEditable(!editable);
    };

    return (
        <div>
            <Card
                key={id}
                sx={{
                    textAlign: 'left',
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                <CardContent sx={{ width: '100%' }}>
                    <Typography variant="h4" component="p">
                        {editable ? (
                            <TextField
                                label="Título"
                                variant="outlined"
                                value={titleUpdate}
                                onChange={e => setTitleUpdate(e.target.value)}
                                required
                                color="secondary"
                                sx={{ width: '100%' }}
                            />
                        ) : (
                            title
                        )}
                    </Typography>
                    <Typography
                        sx={{
                            display: 'block',
                            fontSize: '16px',
                            whiteSpace: 'pre-wrap',
                        }}
                        color="text.secondary"
                    >
                        {editable ? (
                            <TextField
                                label="Descrição"
                                variant="outlined"
                                value={descriptionUpdate}
                                onChange={e => setDescriptionUpdate(e.target.value)}
                                sx={{ margin: '14px 0', width: '100%' }}
                                color="secondary"
                            />
                        ) : (
                            description
                        )}
                    </Typography>
                    <Typography color="text.secondary" gutterBottom>
                        {limitDate}
                    </Typography>
                    {done}
                    {editable ? (
                        <Button
                            size="small"
                            onClick={updateNote}
                            variant="contained"
                            sx={{ marginTop: 1 }}
                            color="secondary"
                        >
                            Alterar
                        </Button>
                    ) : (
                        ''
                    )}
                </CardContent>
                <CardActions sx={{ justifyContent: 'space-between' }}>
                    <Button
                        size="small"
                        onClick={handleEditableToggle}
                        color="secondary"
                    >
                        {editable ? 'Voltar' : 'Editar'}
                    </Button>
                    {editable ? (
                        <Button
                            size="small"
                            onClick={deleteNote}
                            variant="outlined"
                            color="error"
                        >
                            Excluir
                        </Button>
                    ) : (
                        <Button
                            size="small"
                            onClick={deleteNote}
                            variant="outlined"
                            color="success"
                        >
                            Concluir
                        </Button>
                    )}
                </CardActions>
            </Card>
        </div>
    );
}
