import React, { useContext } from 'react';
import { Button } from '@mui/material';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router';

export const LogoutButton: React.FC = () => {
    const { removeToken } = useContext(AuthContext)!;

    return (
        <Link to={'/login'}>
            <Button
                variant="contained"
                color="error"
                sx={{
                    position: 'fixed',
                    top: 20,
                    right: 20,
                }}
                onClick={removeToken}
            >
                Logout
            </Button>
        </Link>

    );
};
