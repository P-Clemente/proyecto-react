import React from "react";
import { TableContainer,Table,TableHead,TableRow,TableCell,TableBody,AppBar, Button, Box, Grid, TextField, Typography, Dialog,DialogTitle,DialogContent, Checkbox, FormControlLabel, ButtonGroup, Toolbar } from '@material-ui/core';

import { BlobServiceClient } from '@azure/storage-blob';
import img from '../img/loginBackground.png';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useState,useEffect, formState } from "react";
import { createTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';


const SAS_TOKEN = "sv=2024-11-04&ss=bfqt&srt=co&sp=rwdlacupiytfx&se=2025-04-30T09:36:35Z&st=2025-04-03T01:36:35Z&spr=https,http&sig=UgHmQmeBAJDjvrS8zCFBPXpSCYDNDaCTajowdLQrfso%3D";
const STORAGE_URL = "https://storagalmacenamiento.blob.core.windows.net";
const CONTAINER_NAME = "imagescontainer";

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
        height:"100vh"
    },
    card:{
      backgroundColor:'#C19A6B',
    }
  }));


export function Users () {
    const classes = useStyles();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    // Cerrar sesion
    const handleLogout = () => {
      localStorage.removeItem("token"); // Elimina el token
      navigate("/login"); // Redirige al login
    };

    // editar evento
    const handleInputChange = (event)=>{
      const {name, value}= event.target;
      setFormState({...formState, [name]:value})
    }

    //imagen
    const uploadImageAzure = async (file) => {
      if(!file) return;

      setLoading(true);

      const blobServiceClient = new BlobServiceClient(`${STORAGE_URL}/?${SAS_TOKEN}`)
      const containerClient = blobServiceClient.getContainerClient(CONTAINER_NAME);
      const blobName = `${Date.now()}-${file.name}`;
      const blockBlobClient = containerClient.getBlockBlobClient(blobName);

      try{
          await blockBlobClient.uploadData(file, {
              blobHTTPHeaders: { blobContentType: file.type },
          });

          const imageUrl = `${STORAGE_URL}/${CONTAINER_NAME}/${blobName}?${SAS_TOKEN}`;
          setFormState((prevState) => ({ ...prevState, urlFoto: imageUrl}));
          setPreviewImage(imageUrl);
          console.log("Imagen subida con éxito: ", imageUrl);
          console.log(blockBlobClient);
      } catch (error) {
          console.error("Error al cargar la imagen: ", error);
          console.log(blockBlobClient);
      } finally {
          setLoading(false);
      }
  }
  const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (file){
          const reader = new FileReader();
          reader.onload = () => setPreviewImage(reader.result);
          reader.readAsDataURL(file);

          uploadImageAzure(file);
      }
  };

    //ingresar
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

    const[modalEditar, setModalEditar]=useState(false)
    const abrirCerrarModal=()=>{
        setModalEditar(!modalEditar);
      }
  
      const seleccionarItem=(item,caso)=>{
        setFormState(item);
        (caso==='editar')?setModalEditar(true):''
      }
  
// actualizar evento
  const updateLab = async (request, response) => {
    try {
      const url = `http://localhost:4000/User/SignUp/Actualizar/` + formState._id;
      await axios.put(url, formState)
        .then(response => {
          var dataNueva = list;
          dataNueva.map(item => {
            if (formState.id === item.id) {
              item.urlFoto = formState.urlFoto
              item.pNombre = formState.pNombre
              item.sNombre = formState.sNombre
              item.pApellido = formState.pApellido
              item.sApellido = formState.sApellido
              item.nDocumento = formState.nDocumento
              item.email = formState.email
              item.contrasenia = formState.contrasenia
              item.direccion = formState.direccion
              item.nTelefonico = formState.nTelefonico
            }
            response();
            if (confirm(setList(dataNueva)) === true) {
              abrirCerrarModal();
            }

          })
        })
    } catch (error) {
      console.error(error)
    }
  }
    
 //eliminar
  const deleteLab = (_id, nombre) => {
    try {
      if (confirm("ID QUE TENIA EL MODULO EN LA BASE DE DATOS: " + _id + " \nELIMINÓ EL usuario: " + nombre) === true) {
        const url = "http://localhost:4000/User/SignUp/Eliminar/";
        const response = axios.delete(url + _id);
        console.log(response.data)
      }


    } catch (error) {
      console.error(error)
    }
  }
    //

    const [list, setList]= useState([]);
      
    const getLab = async() =>{
      try {
        const url ="http://localhost:4000/User/SignUp/Usuarios/all";
        
        const response =  await axios.get(url);
        console.log(response)
        setList(response.data)

      } catch (error) {
        console.error(error)
      }
    }
    useEffect ( ()=>{
        getLab();
     },[]);
    return (
        
        <main className={classes.main}>
            <AppBar position='static' >
            
                                                
                <Box className={classes.card} boxShadow='0px 2px 20px black'> 
            
                    <Toolbar>
                        <Grid container direction='row' justifyContent='flex-end'>
            
                            <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">                                            
                                <Button onClick={handleLogout}>Cerrar Sesion</Button>
                                
                            </ButtonGroup>
                        </Grid>
                    </Toolbar> 
                </Box>
            </AppBar>
            <br/>
                
                <Grid container >
                    <Box margin="auto" width="99%"  boxShadow='0px 2px 20px black' className={classes.card}>
                        <TableContainer  >
                            <Table color="primary">
                                <TableHead >
                                        <TableRow>
                                        <TableCell align="center">foto </TableCell>
                                        <TableCell align="center">Documento </TableCell>
                                        <TableCell align="center">nombre </TableCell>
                                        <TableCell align="center">segundo Nombre</TableCell>
                                        <TableCell align="center">primer Apellido</TableCell>
                                        <TableCell align="center">segundo Apellido</TableCell>
                                        <TableCell align="center">Fecha Nacimiento</TableCell>
                                        <TableCell align="center">email</TableCell>
                                        <TableCell align="center">Direccion</TableCell>
                                        <TableCell align="center">Numero Celular</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody >
                                        {list.map((item) => (
                                        <TableRow key={item.id}> 
                                            {console.log(item.urlFoto)}
                                            <TableCell align="center">
                                                <img 
                                                src={item.urlFoto} 
                                                alt="Foto del usuario" 
                                                style={{ width: '100px', height: '110px', borderRadius: '100%' }} />
                                            </TableCell>
                                            <TableCell align="center">{item.nDocumento}</TableCell>
                                            <TableCell align="center">{item.pNombre}</TableCell>
                                            <TableCell align="center">{item.sNombre}</TableCell>
                                            <TableCell align="center">{item.pApellido}</TableCell>
                                            <TableCell align="center">{item.sApellido}</TableCell>
                                            <TableCell align="center">{item.fNacimiento}</TableCell>
                                            <TableCell align="center">{item.email}</TableCell>
                                            <TableCell align="center">{item.direccion}</TableCell>
                                            <TableCell align="center">{item.nTelefonico}</TableCell>
                                                <TableCell align="center">
                                                    <EditIcon color="primary" variant="contained" onClick={()=>seleccionarItem(item,'editar')}>Editar</EditIcon>
                                                    <DeleteIcon color="primary" variant="contained" onClick={()=>deleteLab(item._id, item.nombre)}>eliminar</DeleteIcon>
                                                </TableCell>

                                        </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Grid>
                <Dialog   open={modalEditar} onClose={abrirCerrarModal} maxWidth="md">
                    <Grid container padding="1%" className={classes.card}>
                            <DialogTitle margin="auto">
                            <Typography  color="initial"className={classes.title} >Editar Datos</Typography>
                            </DialogTitle>
                            <br />
                            <DialogContent>
                            <Box component="form">
                                <Grid container spacing={1}>
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
                                      label='Numero de Ddocumento'
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
                                  <Grid item xs={12} sm={6}>
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
                                  <Grid item xs={12} sm={6}>
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
                                  <Grid item xs={12} sm={6}>
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
                                  <Grid item xs={12} sm={6}>
                                    <TextField
                                      type='number'
                                      name="nTelefonico"
                                      label='Numero Telefonico'
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
                                        Editar Foto
                                      </Button>
                                    </label>
                                  </Grid>

                                </Grid>                                
                                <Grid container justifyContent='center'>
                                <Grid item >
                                    <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2 }}  onClick={updateLab}>
                                      {loading ? "Subiendo imagen..." : "Actualizar"}
                                    </Button>
                                    </Grid>
                                </Grid>
                            </Box>
                        </DialogContent>
                    </Grid>
                </Dialog>        
        </main>
    )
  }