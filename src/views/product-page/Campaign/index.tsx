import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { TextField, Button, MenuItem, Grid, Typography, Box, Slider } from '@mui/material';
import * as yup from 'yup';
import MainCard from 'ui-component/cards/MainCard';

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
  daysOfWeek: yup.string().required('Los días de la semana son requeridos'),
  initHour: yup.string().required('La hora de inicio es requerida'),
  endHour: yup.string().required('La hora de fin es requerida'),
});

const FormCampaingn = () => {

  const [percentageOffer, setPercentageOffer] = React.useState<number>(30);
  const handleChange = (event: Event, newValue: number | number[]) => {
    setPercentageOffer(newValue as number);

  };
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
        daysOfWeek: '',
        initHour: '',
        endHour: '',
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        // Aquí manejas la lógica de envío del formulario
        console.log({ ...values, percentageOffer } );
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (

          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
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
              <Grid item xs={12}>
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
              <Grid item xs={4}>
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
              <Grid item xs={4}>
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
              <Grid item xs={4}>
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
              <Grid item xs={6}>
                <Field
                  as={TextField}
                  fullWidth
                  id="expectedProjection"
                  name="expectedProjection"
                  label="Proyeccion esperada"
                  variant="outlined"
                />
                <ErrorMessage name="expectedProjection" component="div" />
              </Grid>
              <Grid item xs={6}>
                <Field
                  as={TextField}
                  fullWidth
                  id="units"
                  name="units"
                  label="Unidades"
                  variant="outlined"
                />
                <ErrorMessage name="units" component="div" />
              </Grid>
              <Grid item xs={6}>
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
              <Grid item xs={6}>
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
              <Grid item xs={6}>
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
              <Grid item xs={3}>
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
              <Grid item xs={3}>
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
              <Grid item xs={12} sm={12} lg={12} xl={12} >

                <Box component="section" sx={{ p: 2, border: '1px solid #c5c5c5', borderRadius: "3px" }}>
                  <Typography>
                    <strong>Productos</strong>
                  </Typography>
                  <Button variant="contained" style={{ marginTop: "30px" }}>Agregar</Button>
                </Box>
              </Grid>
              <Grid item xs={3} sm={3} lg={3} xl={3} >
                <Typography>
                  Porcentaje de oferta
                </Typography>
                <Slider aria-label="Volume" value={percentageOffer} onChange={handleChange} />
                <Typography>{percentageOffer} %</Typography>
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

export default FormCampaingn;