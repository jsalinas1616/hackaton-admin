
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { TextField, Button, MenuItem, Grid, Typography } from '@mui/material';
import { useField } from 'formik';
import * as yup from 'yup';
import MainCard from 'ui-component/cards/MainCard';


const validationSchema = yup.object().shape({
    sku: yup.string().required('El SKU es requerido'),
    productType: yup.string().required('El tipo de producto es requerido'),
    productName: yup.string().required('El nombre del producto es requerido'),
    description: yup.string().required('La descripción es requerida'),
    priceList: yup.number().required('El precio de lista es requerido').positive('El precio debe ser positivo'),
    priceSell: yup.number().required('El precio de venta es requerido').positive('El precio debe ser positivo'),
    profitMargin: yup.number().required('El margen de beneficio es requerido').min(0, 'El margen no puede ser negativo'),
    unities: yup.string().required('Las unidades son requeridas'),
    initDate: yup.date().required('La fecha de inicio es requerida'),
    endDate: yup.date()
        .required('La fecha de fin es requerida')
        .min(yup.ref('initDate'), 'La fecha de fin debe ser posterior a la fecha de inicio'),
    daysOfWeek: yup.string().required('Los días de la semana son requeridos'),
    initHour: yup.string().required('La hora de inicio es requerida'),
    endHour: yup.string().required('La hora de fin es requerida'),
    campaing: yup.string().required('La campaña es requerida'),
});






const FormProduct = ({ field, form, ...other }: any) => {
    const [previewUrl, setPreviewUrl] = useState('');
    const handleChange = (event: any) => {
        const file = event.currentTarget.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setPreviewUrl(imageUrl);
            form.setFieldValue(field.name, file); // Set the form field to the file object
        }
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
                daysOfWeek: '',
                initHour: '',
                endHour: '',
                campaing: ''
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
                console.log({ ...values, urlImage: previewUrl });
                setSubmitting(false);
            }}
        >
            {({ isSubmitting }) => (


<Form>
                <Grid container spacing={2}>
                    
                    <Grid item xs={5}>
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

<Grid item xs={12}>
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
                onChange={handleChange}
                {...field}
                {...other}
                style={{ display: 'none' }}
                id="imagePicker"
            />
       
        </Grid>
        {previewUrl && (
            <Grid item xs={12}>
                <Typography variant="subtitle1">Vista previa:</Typography>
                <img src={previewUrl} alt="Preview" style={{background:"#000"}} />
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
        <MenuItem value="type1">Tipo 1</MenuItem>
        <MenuItem value="type2">Tipo 2</MenuItem>
        <MenuItem value="type3">Tipo 3</MenuItem>
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
                    <Grid item xs={7}>
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
                                            fullWidth
                                            id="initDate"
                                            type="date"
                                            name="initDate"
                                            label="Fecha de Inicio"
                                            inputFormat="dd/MM/yyyy"
                                            variant="outlined"
                                        />

                                        <ErrorMessage name="initDate" component="div" />
                                    </Grid>
                                    <Grid item xs={12}>

                                        <Field
                                            as={TextField}
                                            fullWidth
                                            id="endDate"
                                            type="date"
                                            name="endDate"
                                            label="Fecha de Fin"
                                            inputFormat="dd/MM/yyyy"
                                            variant="outlined"
                                        />

                                        <ErrorMessage name="endDate" component="div" />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            as={TextField}
                                            select
                                            fullWidth
                                            id="daysOfWeek"
                                            name="daysOfWeek"
                                            label="Días de la Semana"
                                            variant="outlined"
                                        >
                                            <MenuItem value="monday">Lunes</MenuItem>
                                            <MenuItem value="tuesday">Martes</MenuItem>
                                            <MenuItem value="wednesday">Miércoles</MenuItem>
                                            <MenuItem value="thursday">Jueves</MenuItem>
                                            <MenuItem value="friday">Viernes</MenuItem>
                                            <MenuItem value="saturday">Sábado</MenuItem>
                                            <MenuItem value="sunday">Domingo</MenuItem>
                                        </Field>
                                        <ErrorMessage name="daysOfWeek" component="div" />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Field
                                            as={TextField}
                                            fullWidth
                                            id="initHour"
                                            name="initHour"
                                            label="Hora de Inicio"
                                            variant="outlined"
                                        />
                                        <ErrorMessage name="initHour" component="div" />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Field
                                            as={TextField}
                                            fullWidth
                                            id="endHour"
                                            name="endHour"
                                            label="Hora de Fin"
                                            variant="outlined"
                                        />
                                        <ErrorMessage name="endHour" component="div" />
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