import React, { useState } from 'react';
import { Tabs, Tab, Grid, Box, TextField, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const productos = [
    { id: 1, nombre: 'tenis', number:'55401293845', date:"29 enero 4:30pm", ofert:'$50',descripcion: 'Tenis 123', liked: true},
    { id: 2, nombre: 'jugos', number:'55401293845', date:"29 enero 4:30pm", ofert:'$50', descripcion: 'Jugo de uva', liked: false },
];

const TabsAccepted = () => {

    const [busqueda, setBusqueda] = useState('');
    const [isActiveLogo, setIsActiveLogo] = useState(false)

    const handleBusquedaChange = (event: any) => {
        setBusqueda(event.target.value);
    };

    const filtrarProductos = (producto: any) => {
        return (
            producto.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
            producto.descripcion.toLowerCase().includes(busqueda.toLowerCase())
        );
    };

    return (
        <React.Fragment>
            <Box sx={{ p: 3 }}>
                <Grid container>
                    <Grid item xs={5}>
                       <strong> Ofertas Aprobadas  </strong>
                    </Grid>
                    <Grid item xs={7}>
                        <TextField
                            label="Buscar productos"
                            variant="outlined"
                            value={busqueda}
                            onChange={handleBusquedaChange}
                            fullWidth
                            sx={{ mb: 2 }}
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><SearchIcon/></InputAdornment>,
                              }}
                        />
                    </Grid>
                 
                    <Grid item xs={12}>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>ID</TableCell>
                                        <TableCell>Nombre</TableCell>
                                        <TableCell>Oferta</TableCell>
                                        <TableCell>Descripción</TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {productos.filter(filtrarProductos).slice(0, 10).map((producto) => (
                                        <TableRow key={producto.id}>
                                            <TableCell>{producto.id}</TableCell>
                                            <TableCell>
                                                <div style={{padding:"0px"}}>
                                                {producto.nombre}
                                                <p style={{fontSize:"10px", margin: "0px"}}>{producto.number} {producto.date }</p>
                                                </div>
                                            </TableCell>
                                            <TableCell>{producto.ofert}</TableCell>
                                            <TableCell>{producto.descripcion}</TableCell>
                                            <TableCell>
                                                { producto.liked ? <FavoriteIcon /> : <FavoriteBorderIcon/> }
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>


            </Box>
        </React.Fragment>
    )
}

export default TabsAccepted;
