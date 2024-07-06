import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { TextField, Button, MenuItem, Grid, Typography, Box, Slider } from '@mui/material';
import * as yup from 'yup';

import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Cookies from 'js-cookie';





const names = [
  'Lunes',
  'Martes',
  'Miercoles',
  'Jueves',
  'Viernes',
  'Sabado',
  'Domingo'
];

const productsDomy: any = [
  { images: ["https://hebmx.vteximg.com.br/arquivos/ids/704037/794463_2.jpg?v=638521751025270000"], sku: ["319957"], name: "Unguento de Aceites Esenciales" },
  { images: ["https://hebmx.vteximg.com.br/arquivos/ids/667717/719668_1714826626.png?v=638521697408100000"], sku: ["316062"], name: "Tequila Blanco 750 Ml" },
  { images: ["https://hebmx.vteximg.com.br/arquivos/ids/680445/751797_301445104.jpg?v=638521716974130000"], sku: ["317583"], name: "Margarina Untable con Sal 210 Gr" },
  { images: ["https://hebmx.vteximg.com.br/arquivos/ids/670816/7501058639899_10_image-1662325254.jpg?v=638497910529800000"], sku: ["316334"], name: "Agua Natural 8 Pack 500ml 1 Pz" },
]

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

const validationSchema = yup.object().shape({
  campaingName: yup.string().required('El nombre de la campaña es requerido'),
  campaingDescription: yup.string().required('La descripción de la campaña es requerida'),
  department: yup.string().required('El departamento es requerido'),
  category: yup.string().required('La categoría es requerida'),
  subcategory: yup.string().required('La subcategoría es requerida'),
  units: yup.string().required('Las unidades son requeridas'),
  expectedProjection: yup.string().required('Las Proyeccion es requerida'),
  initDate: yup.date().required('La fecha de inicio es requerida'),
  endDate: yup.date()
    .required('La fecha de fin es requerida')
    .min(yup.ref('initDate'), 'La fecha de fin debe ser posterior a la fecha de inicio'),
  mode: yup.string().required('La mode de campaña es requerido')
});

const FormCampaingn = () => {

  const [percentageOffer, setPercentageOffer] = React.useState<number>(30);
  const [busqueda, setBusqueda] = useState('');
  const [weekDays, setWeekDays] = React.useState<string[]>([]);
  const [products, setProducts] = useState([])
  const [open, setOpen] = React.useState(false);
  let currentItems: any = []
  const [skus, setSkus] = useState([])
  



  const handleChangePercentage = (event: Event, newValue: number | number[]) => {
    setPercentageOffer(newValue as number);
  }
  const handleBusquedaChange = (event: any) => {
    setBusqueda(event.target.value);
  };

  const filterProducts = (producto: any) => {
    return (
      producto.name.toLowerCase().includes(busqueda.toLowerCase()) ||
      producto.sku[0].toLowerCase().includes(busqueda.toLowerCase())
    );
  };

  const addproductInCampaign = (item: any) => {
    currentItems.push(item)
    console.log(currentItems)
    setSkus(currentItems)

  }

  const handleChangeMultipleSelect = (event: SelectChangeEvent<typeof weekDays>) => {
    const {
      target: { value },
    } = event;
    setWeekDays(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const getProducts = () => {
    const valueAuth = Cookies.get('authentication')
    let productsTocken;
    try {
      productsTocken = valueAuth ? valueAuth : productsDomy;
    } catch (error) {
      console.error("Error al analizar valueAuth:", error);
      productsTocken = productsDomy; // Usar valor predeterminado en caso de error
    }
 
  }





  const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    getProducts()

  }, [])


  return (
    <Formik
      initialValues={{
        campaingName: '',
        campaingDescription: '',
        department: '',
        category: '',
        subcategory: '',
        units: '',
        expectedProjection: '',
        initDate: '2024-07-02',
        endDate: '2024-07-02',
        mode: ''
      }}
      validationSchema={validationSchema}

      onSubmit={(values, { setSubmitting }) => {
        let body = {
          campaignName: values.campaingName,
          campaignDescription: values.campaingDescription,
          department: values.campaingDescription,
          category: values.category,
          subcategory: values.subcategory,
          expectedProjection: values.expectedProjection,
          units: values.units,
          currentUnits: values.units,
          initDate: values.initDate,
          endDate: values.endDate,
          weekDays: [0, 1, 2],
          skuList: ["319807", "315981","316977"],
          baseOffer: percentageOffer,
          baseOfferType: 1,
          mode: values.mode,
          customData: {
            additionalProp1: "string",
            additionalProp2: "string",
            additionalProp3: "string"
          }
        }


        var url = "http://ec2-54-82-192-230.compute-1.amazonaws.com/service/api/admin/campaign";
        var data = body;

        fetch(url, {
          method: "POST", // or 'PUT'
          body: JSON.stringify(data), // data can be `string` or {object}!
          headers: {
            "Content-Type": "application/json",
            "accept": "text/plain"
          },
        })
          .then((res) => res.json())
          .catch((error) => console.error("Error:", error))
          .then((response) => {
            console.log("Success:", response)
            setOpen(true)
             window.location.href = "/dashboard"
          });
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (

        <Form>
          <div>
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
          </div>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12} lg={12} xl={12}>
              <Field
                as={TextField}
                fullWidth
                id="campaingName"
                name="campaingName"
                label="Nombre de la Campaña"
                variant="outlined"
              />
              <ErrorMessage name="campaingName" component="div" />
            </Grid>
            <Grid item xs={12} md={12} lg={12} xl={12}>
              <Field
                as={TextField}
                multiline
                fullWidth
                id="campaingDescription"
                name="campaingDescription"
                label="Descripción de la Campaña"
                variant="outlined"
                rows={6}
              />
              <ErrorMessage name="campaingDescription" component="div" />
            </Grid>
            <Grid item xs={12} md={12} lg={4} xl={4}>
              <Field
                as={TextField}
                select
                fullWidth
                id="department"
                name="department"
                label="Departamento"
                variant="outlined"
              >
                <MenuItem value="dept1">Departamento 1</MenuItem>
                <MenuItem value="dept2">Departamento 2</MenuItem>
                <MenuItem value="dept3">Departamento 3</MenuItem>
              </Field>
              <ErrorMessage name="department" component="div" />
            </Grid>
            <Grid item xs={12} md={12} lg={4} xl={4}>
              <Field
                as={TextField}
                select
                fullWidth
                id="category"
                name="category"
                label="Categoría"
                variant="outlined"
              >
                <MenuItem value="cat1">Categoría 1</MenuItem>
                <MenuItem value="cat2">Categoría 2</MenuItem>
                <MenuItem value="cat3">Categoría 3</MenuItem>
              </Field>
              <ErrorMessage name="category" component="div" />
            </Grid>
            <Grid item xs={12} md={12} lg={4} xl={4}>
              <Field
                as={TextField}
                select
                fullWidth
                id="subcategory"
                name="subcategory"
                label="Subcategoría"
                variant="outlined"
              >
                <MenuItem value="subcat1">Subcategoría 1</MenuItem>
                <MenuItem value="subcat2">Subcategoría 2</MenuItem>
                <MenuItem value="subcat3">Subcategoría 3</MenuItem>
              </Field>
              <ErrorMessage name="subcategory" component="div" />
            </Grid>
            <Grid item xs={12} md={6} lg={6} xl={6}>
              <Field
                as={TextField}
                fullWidth
                id="expectedProjection"
                type="number"
                name="expectedProjection"
                label="Proyeccion esperada"
                variant="outlined"
              />
              <ErrorMessage name="expectedProjection" component="div" />
            </Grid>
            <Grid item xs={12} md={6} lg={6} xl={6}>
              <Field
                as={TextField}
                fullWidth
                id="units"
                type="number"
                name="units"
                label="Unidades"
                variant="outlined"
              />
              <ErrorMessage name="units" component="div" />
            </Grid>
            <Grid item xs={12} md={6} lg={6} xl={6}>
              <Field
                as={TextField}
                fullWidth
                type="date"
                id="initDate"
                name="initDate"
                label="Fecha de Inicio"
                variant="outlined"
              />
              <ErrorMessage name="initDate" component="div" />
            </Grid>
            <Grid item xs={12} md={6} lg={6} xl={6}>
              <Field
                as={TextField}
                fullWidth
                id="endDate"
                type="date"
                name="endDate"
                label="Fecha de Fin"
                variant="outlined"
              />
              <ErrorMessage name="endDate" component="div" />
            </Grid>
            <Grid item xs={12} md={6} lg={6} xl={6}>
              <FormControl fullWidth >
                <InputLabel id="demo-multiple-chip-label">Dias de la semana</InputLabel>
                <Select

                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  multiple
                  value={weekDays}
                  onChange={handleChangeMultipleSelect}
                  input={<OutlinedInput id="select-multiple-chip" label="Dias de la semana" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {names.map((name) => (
                    <MenuItem
                      key={name}
                      value={name}
                    >
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} lg={3} xl={3}>
              <Field
                as={TextField}
                select
                fullWidth
                id="mode"
                name="mode"
                label="Modo de categoria"
                variant="outlined"
              >
                <MenuItem value="auto">Auto</MenuItem>
                <MenuItem value="manual">Manual</MenuItem>

              </Field>
              <ErrorMessage name="productType" component="div" />
            </Grid>
            <Grid item xs={12} sm={12} lg={12} xl={12} >

              <Box component="section" sx={{ p: 2, border: '1px solid #c5c5c5', borderRadius: "3px" }}>
                <Typography style={{ marginBottom: "20px" }}>
                  <strong>Selecciona los productos para esta campaña</strong>
                </Typography>
                <Grid item xs={12}>
                  <TextField
                    label="Buscar productos"
                    variant="outlined"
                    value={busqueda}
                    onChange={handleBusquedaChange}
                    fullWidth
                    sx={{ mb: 2 }}
                    InputProps={{
                      startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
                    }}
                  />
                </Grid>

                <Typography style={{ marginBottom: "15px" }}>
                  <strong>Productos</strong>
                </Typography>
                <Grid container spacing={2}>
                  {
                    products?.filter(filterProducts).slice(0, 10).map((item: any, index: any) => (
                      <Grid item xs={12} md={6} lg={3} xl={3} key={index}>
                        <div style={{ display: "flex" }} >

                          <div >
                            <img src={item.images[0]} alt="product" style={{ height: "65px", width: "90px" }} />
                          </div>
                          <div style={{ marginLeft: "15px", marginTop: "10px" }}>
                            <span style={{ fontSize: "12px" }} >{item.name} <br /> SKU:     {item.sku[0]} </span>
                          </div>
                        </div>
                        <Button fullWidth variant="contained" onClick={(e) => { addproductInCampaign(item.sku[0]) }} >Agregar</Button>

                      </Grid>
                    ))
                  }
                </Grid>

              </Box>
            </Grid>
            <Grid item xs={12} md={12} lg={12} xl={12} >
              <Typography>
                Porcentaje de oferta
              </Typography>
              <Slider aria-label="Volume" value={percentageOffer} onChange={handleChangePercentage} />
              <Typography>{percentageOffer} %</Typography>
            </Grid>
            <Grid item xs={12} md={6} lg={3} xl={3}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                style={{ marginRight: "20px", marginBottom: "15px  " }}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                style={{ marginRight: "20px", marginBottom: "15px  " }}
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

export default FormCampaingn;