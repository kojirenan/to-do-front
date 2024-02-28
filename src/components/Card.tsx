import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { INote } from '../routes/HomeUser';
import { Checkbox } from '@mui/material';

export default function BasicCard({ id, title, description, date, done }: INote) {
    const formatedDate = new Date(date);

    return (
        <Card sx={{ minWidth: 275 }} key={id}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {formatedDate.toLocaleString('pt-BR')}
                </Typography>
                <Typography variant="h5" component="div">
                    {title}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Descrição
                </Typography>
                <Typography variant="body2">{description}</Typography>
                <div style={{ display: 'flex' }}>
                    <p>Concluído:</p>
                    <Checkbox
                        checked={done}
                        inputProps={{ 'aria-label': 'controlled' }}
                        disabled
                    />
                </div>
            </CardContent>
            <CardActions>
                <Button size="small">Alterar nota</Button>
            </CardActions>
        </Card>
    );
}
