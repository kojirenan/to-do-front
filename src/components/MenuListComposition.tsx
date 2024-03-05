import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import { Link } from '@mui/material';
import { LinkTwoTone } from '@mui/icons-material';

export default function FadeMenu() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                id="fade-button"
                aria-controls={open ? 'fade-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                sx={{
                    color: 'white',
                    border: 'white 1px solid',
                    '&:hover': {
                        borderColor: '#cdc4af',
                        color: '#cdc4af',
                    },
                }}
            >
                <LinkTwoTone /> Links
            </Button>
            <Menu
                id="fade-menu"
                MenuListProps={{
                    'aria-labelledby': 'fade-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
            >
                <MenuItem onClick={handleClose}>
                    <Link
                        href="https://github.com/kojirenan/"
                        target="_blanket"
                        underline="none"
                        sx={{ color: 'white' }}
                    >
                        Perfil GitHub
                    </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <Link
                        href="https://github.com/kojirenan/to-do-front"
                        target="_blanket"
                        underline="none"
                        sx={{ color: 'white' }}
                    >
                        Código Front-End
                    </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <Link
                        href="https://github.com/kojirenan/to-do"
                        target="_blanket"
                        underline="none"
                        sx={{ color: 'white' }}
                    >
                        Código Back-End
                    </Link>
                </MenuItem>
            </Menu>
        </div>
    );
}
