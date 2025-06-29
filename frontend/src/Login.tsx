import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid"
import TextField from "@mui/material/TextField"
import { useContext, useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { Alert, Stack } from "@mui/material"
import { useNavigate } from "react-router"
import { AuthContext } from "./context/AuthContext"
import { api } from "./lib/axios"
import type { AxiosError } from "axios"

export const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const { setToken } = useContext(AuthContext)!;
    const navigate = useNavigate()

    const { mutate, error, isError } = useMutation({
        mutationFn: async () => {
            const response = await api.post("/login", { username, password })
            return response.data
        },
        onSuccess: (data) => {
            setToken(data.token)
            navigate("/")
        }
    })

    return <Grid container direction="column" spacing={1}>
        <img src="src/assets/jesus.gif"/>
        <TextField 
            id="username" 
            label="Usuario" 
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
        />
        <TextField 
            id="password" 
            label="Contraseña" 
            variant="outlined" 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />
        {isError && <MensajeError error={error as AxiosError}/>}
        <Stack spacing={2}>
            <Button variant="contained" onClick={() => mutate()}>Iniciar Sesión</Button>
            <Button variant="contained" onClick={() => navigate("/register")}>Registrarse</Button>
        </Stack>
    </Grid>
}

const MensajeError = ({error}: {error: AxiosError}) => {
    const mensaje = error.status === 401 ? "Usuario o contraseña incorrectos" : "Error del servidor"
    return <Alert severity="error">{mensaje}</Alert>
}
