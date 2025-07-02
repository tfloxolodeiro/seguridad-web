import React, { useState, useContext } from "react";
import { Box, Button, TextField, Typography, Alert } from "@mui/material";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { AuthContext } from "./context/AuthContext";
import { api } from "./lib/axios";

const Registro: React.FC = () => {
    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");
    const [confirmacionContraseña, setConfirmacionContraseña] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { setToken } = useContext(AuthContext)!;

    const { mutate, isError } = useMutation({
        mutationFn: async () => {
            const response = await api.post("/register", {
                username: usuario,
                hash: password, // TODO: Implementar el hash por aca
                salt: "123" // TODO: Generar salt random
            });
            return response.data;
        },
        onSuccess: (data) => {
            setToken(data.token, false);
            navigate("/");
        },
        onError: () => {
            setError("Error del servidor");
        }
    });

    const handleSubmit = () => {
        if(!usuario || !password || !confirmacionContraseña) {
            setError("Todos los campos son obligatorios.");
            return;
        }

        if (password !== confirmacionContraseña) {
            setError("Las contraseñas no coinciden.");
            return;
        }

        mutate();
    };

return (
    <Box maxWidth={500} p={3} boxShadow={3} borderRadius={2}>
        <Typography
            variant="h4"
            mb={3}
            align="center"
            sx={{
                fontWeight: "bold",
            }}
        >
            Registro
        </Typography>
            <TextField
                label="Usuario"
                value={usuario}
                onChange={e => setUsuario(e.target.value)}
                fullWidth
                margin="normal"
                required
            />
            <TextField
                label="Contraseña"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                fullWidth
                margin="normal"
                required
            />
            <TextField
                label="Confirmar Contraseña"
                name="confirmacionContraseña"
                type="password"
                value={confirmacionContraseña}
                onChange={e => setConfirmacionContraseña(e.target.value)}
                fullWidth
                margin="normal"
                required
            />
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ m: 1 }} onClick={handleSubmit}>
                Registrarse
            </Button>
        {(error || isError) && <Alert severity="error" sx={{ mt: 2 }}>{error || "Error al registrar usuario"}</Alert>}
    </Box>
);
};

export default Registro;