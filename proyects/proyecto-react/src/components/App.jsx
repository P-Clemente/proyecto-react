
import { AppBar, Button, Box, Grid, TextField, ButtonGroup, Toolbar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import axios from 'axios';

import { useState } from "react";
import * as React from 'react';
import { useNavigate } from "react-router-dom";
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
      backgroundColor:'#C19A6B',
    }
  }));

  

export function App () {
    const classes = useStyles();
    const navigate = useNavigate();

    const handleVolver = () => {
        navigate('/');
    }
    const [formState, setFormState] = useState({
        pNombre:"",
        sNombre:"",
        pApellido:"",
        sApellido:"",
        nDocumento:"",
        fNacimiento:"",
        email:"",
        password:"",
        direccion:"",
        nTelefonico:"",
        urlFoto:"",
    })

    const handleInputChange = (event)=>{
        const {name, value}= event.target;
        setFormState({...formState, [name]:value})
    }
    const createUser = async (event) =>{
        event.preventDefault();
        try{
          const url = "http://localhost:4000/User/SignUp";
          const response = await axios.post(url,formState)
          if(response.status === 201){
            alert("regitro exitoso");
            navigate("/Login");
            console.log(response)
            }else{
                alert("problemas")
            }        
        }
      catch (error){
        console.log(error)
        }

    }

    const handleRegistrar = () => {
        navigate('/users');
    }


    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setFormState({ ...formState, urlFoto: reader.result });  // Guarda la imagen como Base64 en formState
        };
        if (file) {
          reader.readAsDataURL(file); 
        }
      };
    return (
        <main  className={classes.main}>
            <ThemeProvider >
                    <Grid >
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
                                    <Box padding="4vh" component="form" width='50vh' height="70vh" boxShadow='0px 2px 2px black' margin='auto' className={classes.card} >
                            <Grid>
                                <Typography component='h3' variant='h6' align='center' color='text.ligthgreen' >
                                    registrarse
                                </Typography>
                            </Grid>
                            <br />
                            <Grid container >
                                <Grid item xs={12} sm={6} >
                                    <TextField
                                        type="text"
                                        name="pNombre"
                                        label='Primer Nombre'
                                        margin='dense'
                                        fullWidth
                                        required
                                        value={formState.pNombre}
                                        onChange={handleInputChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        type="text"
                                        name="sNombre"
                                        label='Segundo nombre'
                                        margin='dense'
                                        fullWidth
                                        required
                                        value={formState.sNombre}
                                        onChange={handleInputChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        type='text'
                                        name="pApellido"
                                        label='Primer Apellido'
                                        margin='dense'
                                        fullWidth
                                        required
                                        value={formState.pApellido}
                                        onChange={handleInputChange}

                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        type='text'
                                        name="sApellido"
                                        label='Segundo Apellido'
                                        margin='dense'
                                        fullWidth
                                        required
                                        value={formState.sApellido}
                                        onChange={handleInputChange}

                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        type='number'
                                        name="nDocumento"
                                        label='Numero de Documento'
                                        margin='dense'
                                        fullWidth
                                        required
                                        value={formState.nDocumento}
                                        onChange={handleInputChange}

                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        type='date'
                                        name="fNacimiento"
                                        label='Fecha de nacimiento'
                                        required
                                        margin='dense'
                                        fullWidth
                                        value={formState.fNacimiento}
                                        onChange={handleInputChange}
                                        InputLabelProps={{ shrink: true }}
                                    />
                                </Grid>
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
                                <Grid item xs={12} sm={12}>
                                    <TextField
                                        type='text'
                                        name="direccion"
                                        label='Direccion'
                                        required
                                        margin='dense'
                                        fullWidth
                                        value={formState.direccion}
                                        onChange={handleInputChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <TextField
                                        type='number'
                                        name="nTelefonico"
                                        helperText='Numero Telefonico'
                                        required
                                        margin='dense'
                                        fullWidth
                                        value={formState.nTelefonico}
                                        onChange={handleInputChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <input
                                        accept="image/*"
                                        id="urlFoto"
                                        type="file"
                                        style={{ display: 'none' }}
                                        onChange={handleFileChange}
                                    />
                                    <label htmlFor="urlFoto">
                                        <Button variant="contained" color="primary" component="span">
                                            Subir Foto
                                        </Button>
                                    </label>
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
                                            onClick={createUser}
                                        >
                                            ENVIAR
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>

                        </Box>
                    </Grid>                            
                </Grid>
            </ThemeProvider> 
            
        </main>
    )
}