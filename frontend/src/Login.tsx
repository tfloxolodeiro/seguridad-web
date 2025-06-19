import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid"
import TextField from "@mui/material/TextField"

export const Login = () => {

    return <Grid container direction="column" spacing={1}>
        <img src="src/assets/jesus.gif"/>
        <TextField id="outlined-basic" label="Usuario" variant="outlined"/>
        <TextField id="outlined-basic" label="Contraseña" variant="outlined" />
        <Button variant="contained">Login</Button>
    </Grid>
}
