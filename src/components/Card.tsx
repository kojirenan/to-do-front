import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { INote } from '../routes/HomeUser';
import { TextField } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';

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
        date != null ? 'Concluir até: ' + formatedDate.toLocaleString('pt-BR') : '‎ ';

    const [editable, setEditable] = useState(false);

    // const [titleUpdate, setTitleUpdate] = useState(title);
    // const [descriptionUpdate, setDescriptionUpdate] = useState(description);
    // const [dateUpdate, setDateUpdate] = useState(date);
    // const [doneUpdate, setDoneUpdate] = useState(done);

    // console.log(`Title: ${title}, Description: ${description}, Date: ${date}`);

    // const handleSubmit = async (e: React.FormEvent) => {
    //     if (date == '') setDate(null);
    //     e.preventDefault();
    //     try {
    //         const requestData = {
    //             title,
    //             description: description || null,
    //             date: date || null,
    //         };

    //         axios
    //             .post(`https://to-do-jar3.onrender.com/users/${id}/home`, requestData)
    //             .then(res => handleRequest(`${res.data.id}`))
    //             .catch(err => console.error('Erro ao enviar os dados: ', err));
    //     } catch (error) {
    //         console.error('Erro ao fazer login:', error);
    //     }
    // };

    const deleteNote = () => {
        try {
            const randomNumber = Math.floor(Math.random() * 100) + 1;
            axios
                .delete(`https://to-do-jar3.onrender.com/users/${user_id}/home`, {
                    data: { id },
                })
                .then(res => {
                    handleRequest(`${randomNumber}`);
                    console.log(randomNumber);
                    console.log(res.data);
                });
        } catch (error) {
            console.error('Erro ao excluir a nota', error);
        }
    };

    const handleEditableToggle = () => {
        setEditable(!editable);
    };

    return (
        <Card
            sx={{
                minWidth: 275,
                minHeight: 350,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
            }}
            key={id}
        >
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {limitDate}
                </Typography>
                <Typography sx={{ marginTop: 4 }} variant="h5" component="div">
                    {editable ? (
                        <TextField
                            label="Título"
                            variant="outlined"
                            value={title}
                            // onChange={e => setTitle(e.target.value)}
                            required
                        />
                    ) : (
                        title
                    )}
                </Typography>
                <Typography
                    sx={{ display: 'block', marginTop: 2, whiteSpace: 'pre-wrap' }}
                    color="text.secondary"
                >
                    {editable ? (
                        <TextField
                            label="Descrição"
                            variant="outlined"
                            value={description}
                            // onChange={e => setTitle(e.target.value)}
                        />
                    ) : (
                        description
                    )}
                </Typography>
                {done}
                {editable ? (
                    <Button
                        size="small"
                        onClick={handleEditableToggle}
                        variant="contained"
                        sx={{ marginTop: 1 }}
                    >
                        {editable ? 'Salvar' : 'Editar'}
                    </Button>
                ) : (
                    ''
                )}
            </CardContent>
            <CardActions sx={{ justifyContent: 'space-between' }}>
                <Button size="small" onClick={handleEditableToggle}>
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
                    ''
                )}
            </CardActions>
        </Card>
    );
}
