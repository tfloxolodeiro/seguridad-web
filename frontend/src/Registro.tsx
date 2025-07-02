import React, { useState, useContext } from "react";
import { Box, Button, TextField, Typography, Alert } from "@mui/material";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { AuthContext } from "./context/AuthContext";
import { api } from "./lib/axios";
import { md5 } from "js-md5";

function hashFromPass(password: string, salt: string): string {
  const mid = Math.floor(password.length / 2);
  const mixed =
    salt.slice(0, 4) +
    password.slice(0, mid) +
    salt.slice(4, 8) +
    password.slice(mid) +
    salt.slice(8);
  return md5(mixed);
}

const Registro: React.FC = () => {
    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");
    const [confirmacionContraseña, setConfirmacionContraseña] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { setToken } = useContext(AuthContext)!;

    const { mutate, isError } = useMutation({
        mutationFn: async () => {
            let salt = (Math.random() + 1).toString(36).substring(7).toUpperCase()
            if(usuario == "pepita"){
                salt = "PSTIIF"
            }
            const response = await api.post("/register", {
                username: usuario,
                hash: hashFromPass(password, salt),
                salt: salt 
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