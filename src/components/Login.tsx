import React, { useState } from 'react';
import { Box, Typography, Select, Button, FormControl, InputLabel, MenuItem } from '@mui/material';

interface LoginProps {
    onLogin: (role: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const [role, setRole] = useState<string>('customer');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onLogin(role);
    };

    return (
        <Box p={3}>
            <Typography variant="h4">Login</Typography>
            <form onSubmit={handleSubmit}>
                <FormControl fullWidth variant="outlined" margin="normal">
                    <InputLabel htmlFor="role-select">Role</InputLabel>
                    <Select
                        value={role}
                        onChange={(e) => setRole(e.target.value as string)}
                        label="Role"
                        inputProps={{
                            id: 'role-select',
                        }}
                    >
                        <MenuItem value="customer">Customer</MenuItem>
                        <MenuItem value="employee">Employee</MenuItem>
                    </Select>
                </FormControl>
                <Button variant="contained" color="primary" type="submit" fullWidth>
                    Login
                </Button>
            </form>
        </Box>
    );
};

export default Login;
