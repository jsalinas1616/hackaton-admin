import React, { useEffect, useState } from 'react';
import { Tabs, Tab, Grid, Box, TextField, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';

import MainCard from 'ui-component/cards/MainCard';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const Dashboard = () => {
    const [currentTabIndex, setCurrentTabIndex] = useState(0);
    const [search, setSearch] = useState('');
    const [campaign, setCampaign] = useState([])
    const [openDialog, setOpenDialog] = React.useState(false);
    const [dataCampaingId, setDataCampaingId] = useState<any>(null)

    const handleClickOpen = async (id: any) => {
        let url = `http://ec2-54-82-192-230.compute-1.amazonaws.com/service/api/admin/campaign/${id}`
        await fetch(url, {
            headers: {
                "Content-Type": "application/json",
                "accept": "text/plain"
            },
        })
            .then((res) => res.json())
            .catch((error) => console.error("Error:", error))
            .then((response) => {
                console.log("Success:", response.data)
                setDataCampaingId(response.data)
            });
        setOpenDialog(true);
    };

    const handleClose = () => {
        setOpenDialog(false);
    };

    const handleChangeSearch = (event: any) => {
        setSearch(event.target.value);
    };

    const filterProducts = (product: any) => {
        return (
            product.campaignName.toLowerCase().includes(search.toLowerCase())
        );
    };

    useEffect(() => {
        console.log('????-use')
        let url = "http://ec2-54-82-192-230.compute-1.amazonaws.com/service/api/admin/campaign"
        fetch(url, {
            headers: {
                "Content-Type": "application/json",
                "accept": "text/plain"
            },
        })
            .then((res) => res.json())
            .catch((error) => console.error("???Error:", error))
            .then((response) => {
                console.log('????', response);

                if (response.hasError == false) {
                    setCampaign(response.data)
                } else {
                    window.location.href = "/dashboard"
                }

                console.log("Success:", response.data)
            });
    }, [])

    return (
        <MainCard title="Campañas">
            {dataCampaingId != null ?
                <Dialog
                    open={openDialog}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {dataCampaingId?.campaignName}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            <Grid container>
                                <Grid item xs={6}>

                                    <p>Oferta base: {dataCampaingId?.baseOffer
                                    }</p>
                                </Grid>
                                <Grid item xs={6}>
                                    <p>Proyeccion esperada: {dataCampaingId?.expectedProjection
                                    }</p>
                                </Grid>
                                <Grid item xs={6}>

                                    <p>Unidades: {dataCampaingId?.units
                                    }</p>
                                </Grid>
                                <Grid item xs={6}>

                                    <p>Unidades Actuales: {dataCampaingId?.currentUnits
                                    }</p>
                                </Grid>

                                <Grid item xs={6}>

                                    <p>skus:</p>
                                    {
                                        dataCampaingId?.skuList.map((sku: any) => (
                                                    <p><strong>{sku} </strong></p>
                                        ))
                                    }

                                </Grid>
                            </Grid>
                        </DialogContentText>
                    </DialogContent>

                </Dialog> : null
            }
            <Box sx={{ p: 3 }}>
                <Grid container>

                    <Grid item xs={12}>
                        <TextField
                            label="Buscar campaña"
                            variant="outlined"
                            value={search}
                            onChange={handleChangeSearch}
                            fullWidth
                            sx={{ mb: 2 }}
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
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
                                        <TableCell>Oferta Base</TableCell>
                                        <TableCell>Descripción</TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {campaign.filter(filterProducts).slice(0, 10).map((product: any) => (
                                        <TableRow key={product?.campaignId}>
                                            <TableCell>{product?.campaignId}</TableCell>
                                            <TableCell>
                                                <div style={{ padding: "0px" }}>
                                                    {product?.campaignName}
                                                </div>
                                            </TableCell>
                                            <TableCell>{product?.baseOffer}</TableCell>
                                            <TableCell>{product?.campaignDescription}</TableCell>
                                            <TableCell>
                                                <VisibilityIcon onClick={() => { handleClickOpen(product?.campaignId) }}></VisibilityIcon>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>


            </Box>
        </MainCard>
    );
};


export default Dashboard;
