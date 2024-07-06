import React, { useState } from "react";
import {
    Box,
    Tab,
    Tabs,
    Typography,
    TextField,
    Grid,
    InputLabel,
    MenuItem,
    FormControl,
    Button,
    Slider
} from "@mui/material";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormProduct from './Product';
import FormCampaingn from './Campaign';


import MainCard from 'ui-component/cards/MainCard';


const ProductPage = () => {
    const [currentTabIndex, setCurrentTabIndex] = useState(0);


    const handleTabChange = (e: any, tabIndex: number) => {
        console.log(tabIndex);
        setCurrentTabIndex(tabIndex);
    };


    return (
        <React.Fragment>
        <MainCard title="Detalle del producto">
        <Tabs value={currentTabIndex} onChange={handleTabChange}>
            <Tab label='Producto' />
            <Tab label='Campaña' />

        </Tabs>
        {currentTabIndex === 0 && (
            <Box sx={{ p: 3 }}>

                        <FormProduct />
                        </Box>
        )}

        {/* TAB 2 Contents */}
        {currentTabIndex === 1 && (
            <Box sx={{ p: 3 }}>
                
                    <FormCampaingn />
                    
            </Box>
        )}
</MainCard>

    </React.Fragment>
    )
}

export default ProductPage;
