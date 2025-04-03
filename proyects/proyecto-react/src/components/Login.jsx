import {AppBar, Button, Box, Grid, TextField, Typography, Checkbox, FormControlLabel, ButtonGroup, Toolbar } from '@material-ui/core';
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Para redirigir en React Router
import * as React from 'react';
import { createTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';



const theme = createTheme({
    palette: {
      primary:{
        main: '#005eff'
      }
    }
  });
  
  const useStyles = makeStyles(theme => ({
    main: {
        backgroundColor: '#5D3A1A',
        height:'100vh',
    },
    card:{
      backgroundColor:'#C19A6B'
    }
  }));

 export const Login = () => {
    const classes = useStyles();
    const [formState, setFormState] = useState({
        email:"",
        contrasenia:"",
    })
    const navigate = useNavigate(); // Hook para redireccionar
    const handleInputChange = (event)=>{
        const {name, value}= event.target;
        setFormState({...formState, [name]:value})
    }

    //login
    const handleLogin = async (e) => {
        e.preventDefault();
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        });
        
        try {
            const url = "https://proyecto-nube-a6hffcf5h7d5a4d3.canadacentral-01.azurewebsites.net/User/SignIn";
            const response = await axios.post(url,formState);

            if (response.data.token) {
                localStorage.setItem("token", response.data.token); // Guardar token en localStorage
                
                alert("Login exitoso");
    
                setTimeout(() => { // Asegurar que se actualiza el estado antes de redirigir
                    navigate("/users");
                }, 100);
            } else {
                alert("Error en credenciales");
            }

        } catch (error) {
            console.error("Error en el login:", error);
            alert("Error en el login, revisa tus credenciales");
        }
    };

    return (
        <div className={classes.main}>
            <AppBar position='static'>


                <Box className={classes.card}>

                    <Toolbar>
                        <Grid container direction='row' justifyContent='flex-start'>
                            <Typography component='h3' variant='h6' align='center' color='text.ligthgreen' >
                                Proyecto Nube
                            </Typography>
                        </Grid>
                    </Toolbar>
                </Box>
            </AppBar>
            <br />
            <Grid container>
                <Box padding="4vh" component="form" width='50vh' height="30vh" boxShadow='0px 2px 2px black' margin='auto' className={classes.card} >
                    <Grid>
                        <Typography component='h3' variant='h6' align='center' color='text.ligthgreen' >
                            Login
                        </Typography>
                    </Grid>
                    <br />
                    <Grid container >
                        <Grid item xs={12} sm={12}>
                            <TextField
                                type='email'
                                name="email"
                                label='Correo Electrónico'
                                margin='dense'
                                required
                                fullWidth
                                value={formState.email}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                type='password'
                                name="contrasenia"
                                label='contrasena'
                                required
                                margin='dense'
                                fullWidth
                                value={formState.contrasenia}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid
                            container
                            justifyContent='center'
                        >
                            <Grid
                                item
                            >

                                <Button
                                    type='submit'
                                    variant='contained'
                                    sx={{ mt: 3, mb: 2 }}
                                    onClick={ handleLogin}
                                >
                                    ENVIAR
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Grid>
        </div>
    );
};

