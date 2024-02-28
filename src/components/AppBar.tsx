import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Home, Logout } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';

export default function ButtonAppBar() {
    const navigate = useNavigate();
    const location = useLocation();

    const logout = () => {
        navigate('/');
        sessionStorage.removeItem('token');
    };

    return (
        <AppBar position="static">
            <Toolbar>
                {location.pathname.startsWith('/user/') ? (
                    <IconButton color="inherit" onClick={logout}>
                        <Logout />
                    </IconButton>
                ) : (
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={() => navigate('/')}
                    >
                        <Home />
                    </IconButton>
                )}
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    To-do Yssy
                </Typography>
            </Toolbar>
        </AppBar>
    );
}
