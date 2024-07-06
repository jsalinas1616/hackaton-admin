import React, { useEffect, useState } from 'react';
import { Tabs, Tab, Grid, Box, TextField, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, Typography } from '@mui/material';
import TabsAccepted from './Tabs/tabsAccepted'
import TabsIncomplete from './Tabs/tabsInclomplete'
import TabsRejected from './Tabs/tabsRejected'
import TabsWaiting from './Tabs/tabsWaiting'
import MainCard from 'ui-component/cards/MainCard';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';


const Dashboard = () => {
    const [currentTabIndex, setCurrentTabIndex] = useState(0);
    const [search, setSearch] = useState('');
    const [campaign, setCampaign] = useState<any>([])
    const [user, setUser] = useState<any>([])
    const [offers, setOffers] = useState<any>([])

    const handleTabChange = (e: any, tabIndex: number) => {
        setCurrentTabIndex(tabIndex);
    };

    const handleSearchChange = (event: any) => {
        setSearch(event.target.value);
    };

    const filterProducts = (product: any) => {
        return (
            product.sku.toLowerCase().includes(search.toLowerCase())
        );
    };


    useEffect(() => {
        let url = "http://ec2-54-82-192-230.compute-1.amazonaws.com/service/api/admin/campaign/195a520e-d3ba-4a8e-a7f8-444ad645a8b3/offers"
        fetch(url, {
            headers: {
                "Content-Type": "application/json",
                "accept": "text/plain"
            },
        })
            .then((res) => res.json())
            .catch((error) => console.error("Error:", error))
            .then((response) => {
                setCampaign(response.data.campaign)
                setOffers(response.data.offers)
                console.log("Success:", response.data)
            });
    }, [])

    return (
        <MainCard title="Campañas">


            <Box sx={{ width: '100%', background: "#fff", borderRadius: "7px" }}>

                <Box sx={{ p: 3 }}>
                    <Grid container>
                        <Grid item xs={5}>
                            <strong> Ofertas </strong>
                        </Grid>
                        <Grid item xs={7}>
                            <TextField
                                label="Buscar productos"
                                variant="outlined"
                                value={search}
                                onChange={handleSearchChange}
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
                                            <TableCell>ID oferta</TableCell>
                                            <TableCell>Client Id</TableCell>
                                            <TableCell>Numero de telefono</TableCell>
                                            <TableCell>SKU</TableCell>
                                            <TableCell>Monto original</TableCell>
                                            <TableCell>Monto ofertado</TableCell>
                                            <TableCell>Estatus</TableCell>
                                            {/* <TableCell></TableCell> */}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {offers.filter(filterProducts).slice(0, 10).map((product:any) => (
                                            <TableRow key={product?.offerId}>
                                                <TableCell>{product?.offerId}</TableCell>
                                                <TableCell>{product?.clientId}</TableCell>
                                                <TableCell>{product?.numberPhone}</TableCell>
                                                <TableCell>{product.sku}</TableCell>
                                                <TableCell>{product.originalAmount}</TableCell>
                                                <TableCell>{product.offerAmount}</TableCell>
                                                <TableCell>{product.status == 2 ? <p style={{ color: "green" }}>Aceptado</p> : <p style={{ color: "red" }}>Recazado</p> }</TableCell>
                                                {/* <TableCell>
                                                { producto.liked ? <FavoriteIcon /> : <FavoriteBorderIcon/> }
                                            </TableCell> */}
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>


                </Box>
                {/* {currentTabIndex === 0 && (
                <Box sx={{ p: 3 }}>
                    <TabsWaiting />
                </Box>
            )}

            {currentTabIndex === 1 && (
                <Box sx={{ p: 3 }}>
                    <TabsAccepted />
                </Box>
            )}

            {currentTabIndex === 2 && (
                <Box sx={{ p: 3 }}>
                    <TabsIncomplete />
                </Box>
            )}

            {currentTabIndex === 3 && (
                <Box sx={{ p: 3 }}>
                    <TabsRejected />
                </Box>
            )} */}
            </Box>
        </MainCard>
    );
};


export default Dashboard;
