
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { TextField, Button, MenuItem, Grid, Typography, Box } from '@mui/material';
import { useField } from 'formik';
import * as yup from 'yup';
import MainCard from 'ui-component/cards/MainCard';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Cookies from 'js-cookie';


const validationSchema = yup.object().shape({
    sku: yup.string().required('El SKU es requerido'),
    productType: yup.string().required('El tipo de producto es requerido'),
    productName: yup.string().required('El nombre del producto es requerido'),
    description: yup.string().required('La descripción es requerida'),
    priceList: yup.number().required('El precio de lista es requerido').positive('El precio debe ser positivo'),
    priceSell: yup.number().required('El precio de venta es requerido').positive('El precio debe ser positivo'),
    profitMargin: yup.number().required('El margen de beneficio es requerido').min(0, 'El margen no puede ser negativo'),
    unities: yup.string().required('Las unidades son requeridas'),
    campaing: yup.string().required('La campaña es requerida'),
});

const names = [
    'Lunes',
    'Martes',
    'Miercoles',
    'Jueves',
    'Viernes',
    'Sabado',
    'Domingo'
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};



const FormProduct = ({ field, form, ...other }: any) => {
    const [previewUrl, setPreviewUrl] = useState('');
    const [weekDays, setWeekDays] = React.useState<string[]>([]);
    const [open, setOpen] = React.useState(false);
    
    const handleChangeSelectedImage = (event: any) => {
        const file = event.currentTarget.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setPreviewUrl(imageUrl);

        }
    };
    const handleChangeMultipleSelect = (event: SelectChangeEvent<typeof weekDays>) => {
        const {
            target: { value },
        } = event;
        setWeekDays(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    return (
        <Formik
            initialValues={{
                sku: '',
                productType: '',
                productName: '',
                description: '',
                priceList: '',
                priceSell: '',
                profitMargin: '',
                unities: '',
                initDate: '2024-07-02',
                endDate: '2024-07-02',
                campaing: ''
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
                console.log({ ...values, urlImage: previewUrl });

                let body = {
                    "active": true,
                    name: values.productName,
                    "abstract": "string",
                    description: values.description,
                    "references": [
                        "string"
                    ],
                    "tags": [
                        "string"
                    ],
                    "collections": [
                        "string"
                    ],
                    images: [previewUrl],
                    "videos": [
                        previewUrl
                    ],
                    "documents": [
                        previewUrl
                    ],
                    "links": [
                        previewUrl
                    ],
                    "model": [
                        "string"
                    ],
                    "notes": [
                        "string"
                    ],
                    "sku": [values.sku],
                    "ean": [
                        "string"
                    ],
                    "upc": [
                        "string"
                    ],
                    "slogan": "string",
                    "heroImage": previewUrl,
                    "highlights": [
                        "string"
                    ],
                    "url": [
                        previewUrl
                    ],
                    "alternateNames": [
                        "string"
                    ],
                    "seo": {
                        "keywords": [
                            "string"
                        ],
                        "metaTitle": "string",
                        "metaDescription": "string",
                        "canonicalUrl": previewUrl,
                        "structuredData": "string"
                    },
                    "gtin": {
                        "gtin": "string",
                        "gtin8": "string",
                        "gtin12": "string",
                        "gtin13": "string",
                        "gtin14": "string"
                    },
                    "measurements": {
                        "height": 1,
                        "width": 1,
                        "depth": 1,
                        "weight": 1,
                        "volume": 1
                    },
                    "package": {
                        "quantity": 1,
                        "unit": true,
                        "measurements": {
                            "height": 1,
                            "width": 1,
                            "depth": 1,
                            "weight": 1,
                            "volume": 1
                        }
                    },
                    "attributes": [
                        {
                            "id": "string",
                            "name": "string",
                            "value": "string",
                            "type": "string"
                        }
                    ],
                    "specifications": [
                        {
                            "id": "string",
                            "name": "string",
                            "value": "string",
                            "type": "string"
                        }
                    ],
                    "customData": {
                        "additionalProp1": "string",
                        "additionalProp2": "string",
                        "additionalProp3": "string"
                    },
                    "categories": [
                        {
                            "id": "string",
                            "name": "string",
                            "path": [
                                "string"
                            ]
                        }
                    ],
                    "brand": [
                        {
                            "id": "string",
                            "name": "string"
                        }
                    ],
                    "manufacturer": [
                        {
                            "id": "string",
                            "name": "string"
                        }
                    ],
                    "supplier": [
                        {
                            "id": "string",
                            "name": "string",
                            "path": [
                                "string"
                            ]
                        }
                    ],
                    "relatedItems": [
                        {
                            "id": "string",
                            "name": "string"
                        }
                    ],
                    "similarItems": [
                        {
                            "id": "string",
                            "name": "string"
                        }
                    ],
                    "variantItems": [
                        {
                            "id": "string",
                            "name": "string"
                        }
                    ],
                    "audience": [
                        "string"
                    ],
                    "award": [
                        "string"
                    ],
                    "origin": [
                        "string"
                    ],
                    "adultConsideration": true,
                    "certifications": [
                        "string"
                    ],
                    "energyConsumptionDetails": [
                        "string"
                    ],
                    "conditions": [
                        "string"
                    ],
                    "productionDate": values.initDate,
                    "expirationDate": values.endDate,
                    "purchaseDate": "2024-07-06T09:16:26.999Z",
                    "releaseDate": "2024-07-06T09:16:26.999Z",
                    "warranty": [
                        "string"
                    ],
                    "score": 1,
                    "visible": true,
                    "catalog": "main",
                    "discount": 1,
                    "price": values.priceSell,
                    "listPrice": values.priceList,
                    "campaign": values.campaing,
                    "profitMargin": values.profitMargin,
                    "unities": values.unities
                }


                const valueAuth = Cookies.get('authentication')
                let productsTocken;
                try {
                  productsTocken = valueAuth ? valueAuth : 'adsfasdfasf';
                } catch (error) {
                  console.error("Error al analizar valueAuth:", error);
                  productsTocken = 'asdfasf'; // Usar valor predeterminado en caso de error
                }


                let url = "https://trpc-services-template-7pheze4h7q-uc.a.run.app/api/items"
                fetch(url, {
                    method: "POST", // or 'PUT'
                    body: JSON.stringify(body), // data can be `string` or {object}!
                    headers: {
                        "Content-Type": "application/json",
                        "accept": "text/plain",
                        "authorization": `Bearer`,
                    },
                })
                    .then((res) => res.json())
                    .catch((error) => console.error("Error:", error))
                    .then((response) => {
                        setOpen(true)
                        window.location.href = "/dashboard"
                    })
                setSubmitting(false);
            }}
        >
            {({ isSubmitting }) => (


                <Form>
                    <Snackbar open={open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                        <Alert
                            onClose={handleCloseSnackbar}
                            severity="success"
                            variant="filled"
                            sx={{ width: '100%' }}
                        >
                            Se creo con exito!
                        </Alert>
                    </Snackbar>
                    <Grid container spacing={2}>

                        <Grid item xs={12} md={12} lg={5} xl={5}>
                            <MainCard title="Detalle del producto">
                                <Grid container spacing={2}>

                                    <Grid item xs={12}>
                                        <Field
                                            as={TextField}
                                            fullWidth
                                            id="sku"
                                            name="sku"
                                            label="SKU"
                                            variant="outlined"
                                        />
                                        <ErrorMessage name="sku" component="div" />
                                    </Grid>

                                    <Grid item xs={12} style={{ textAlign: "center" }}>
                                        <Grid container spacing={2} alignItems="center">
                                            <Grid item xs={12}>
                                                <label htmlFor="imagePicker">
                                                    <Button variant="contained" component="span">
                                                        Seleccionar Imagen
                                                    </Button>
                                                </label>
                                                <input

                                                    type="file"
                                                    accept=".jpg,.jpeg,.png"
                                                    onChange={handleChangeSelectedImage}
                                                    {...field}
                                                    {...other}
                                                    style={{ display: 'none' }}
                                                    id="imagePicker"
                                                />

                                            </Grid>
                                            {previewUrl && (
                                                <Grid item xs={12}>
                                                    <Typography variant="subtitle1">Vista previa:</Typography>
                                                    <img src={previewUrl} alt="Preview" style={{ background: "#000" }} />
                                                </Grid>
                                            )}
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            as={TextField}
                                            select
                                            fullWidth
                                            id="productType"
                                            name="productType"
                                            label="Tipo de Producto"
                                            variant="outlined"
                                        >
                                            <MenuItem value="Nuevo">Nuevo</MenuItem>
                                        </Field>
                                        <ErrorMessage name="productType" component="div" />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            as={TextField}
                                            fullWidth
                                            id="productName"
                                            name="productName"
                                            label="Nombre del Producto"
                                            variant="outlined"
                                        />
                                        <ErrorMessage name="productName" component="div" />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            as={TextField}
                                            multiline
                                            fullWidth
                                            id="description"
                                            name="description"
                                            label="Descripción"
                                            variant="outlined"
                                            rows={4}
                                        />
                                        <ErrorMessage name="description" component="div" />
                                    </Grid>
                                </Grid>
                            </MainCard>
                        </Grid>
                        <Grid item xs={12} md={12} lg={7} xl={7}>
                            <MainCard title="Detalle del producto">
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <Field
                                            as={TextField}
                                            fullWidth
                                            id="priceList"
                                            name="priceList"
                                            label="Precio de Lista"
                                            variant="outlined"
                                            type="number"
                                        />
                                        <ErrorMessage name="priceList" component="div" />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Field
                                            as={TextField}
                                            fullWidth
                                            id="priceSell"
                                            name="priceSell"
                                            label="Precio de Venta"
                                            variant="outlined"
                                            type="number"
                                        />
                                        <ErrorMessage name="priceSell" component="div" />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Field
                                            as={TextField}
                                            fullWidth
                                            id="profitMargin"
                                            name="profitMargin"
                                            label="Margen de Beneficio (%)"
                                            variant="outlined"
                                            type="number"
                                        />
                                        <ErrorMessage name="profitMargin" component="div" />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Field
                                            as={TextField}
                                            fullWidth
                                            id="unities"
                                            name="unities"
                                            label="Unidades"
                                            variant="outlined"
                                        />
                                        <ErrorMessage name="unities" component="div" />
                                    </Grid>


                                    <Grid item xs={12}>
                                        <Field
                                            as={TextField}
                                            select
                                            fullWidth
                                            id="campaing"
                                            name="campaing"
                                            label="Campaña"
                                            variant="outlined"
                                        >
                                            <MenuItem value="campaign1">Campaña 1</MenuItem>
                                            <MenuItem value="campaign2">Campaña 2</MenuItem>
                                            <MenuItem value="campaign3">Campaña 3</MenuItem>
                                        </Field>
                                        <ErrorMessage name="campaing" component="div" />
                                    </Grid>
                                </Grid>
                            </MainCard>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={isSubmitting}
                                style={{ marginRight: "20px" }}
                            >
                                Cancelar
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={isSubmitting}
                            >
                                Guardar cambios
                            </Button>
                        </Grid>
                    </Grid>
                </Form>

            )}
        </Formik>
    );
};
export default FormProduct