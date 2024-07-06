import React from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Box,
    Button,
    Checkbox,
    Divider,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography,
    useMediaQuery
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import useConfig from 'hooks/useConfig';
import useAuth from 'hooks/useAuth';
import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'ui-component/extended/AnimateButton';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import Google from 'assets/images/icons/social-google.svg';

// ============================|| FIREBASE - LOGIN ||============================ //

const FirebaseLogin = ({ loginProp, ...others }: { loginProp?: number }) => {
    const theme = useTheme();
    const scriptedRef = useScriptRef();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const { borderRadius } = useConfig();
    const [checked, setChecked] = React.useState(true);

    const { firebaseEmailPasswordSignIn, firebaseGoogleSignIn } = useAuth();
    const googleHandler = async () => {
        try {
            await firebaseGoogleSignIn();
        } catch (err) {
            console.error(err);
        }
    };


    const fetchAuthToken = async () => {
        try {
          const response = await fetch('https://trpc-services-template-7pheze4h7q-uc.a.run.app/api/auth/token', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Cookie': 'GAESA=CoQBMDA1YjcwODc3MGYxNmM2NmU1MTBlZGZkYzFjYjc2YzVlOTBmNzE4OTk2ZDQyZGE5MWMzZjVhMjNlODE3OTQ3MjU0YTJhODAxYTcyNjllNDliYmMzMTA0NzQyYWNjM2E0YjJmYjk5YzJhYjQ0YWEzMzljOTMxNzc5OTYwOTA3ZDEzNjYwEPDVkviHMg; GAESA=CoIBMDA1YjcwODc3MDAyMjRlZWNjN2EyNmU4MWI1NTNiOWZmZDA2OGViOTJjNGRkYmVlZTczZGM2ZWZkN2YxNTU2MDA2N2VkMTNhZGZhYzQ2ODZlMjAwZWQzNTA1N2RiMjU0NGExNDJhMTY2MWEyMjcxMmQyMTZjMDAzY2ZlMDI2MmI1NBDBzO29iDI'
            },
            body: JSON.stringify({
              apiKey: "NTFlZWVmMjllYjk2MTRmNTVhYjgwZTMyNTdhMWFlNTI3YzA1ZjcyZDFiNzE2YTQzZjI1YTAzNzRlMzhkMjM4OWY3Mzg4OTExMjliZTM0YmMxOWY2NWMzN2NjZDgwZTJlNWM2ZThjNjgzNWVmMzVjMDg0YTE2M2E4N2E2MmI4MTc5MzIxMDlkZGZhYTE5Y2NiZmYzZDNiMTBmODFkZmMwYWJiMzhkZTBjN2UwMTA2ZDYzMDdmODYzNDgwMjBlZGY0ZjlkNGU0ZWM4NDkwMjdjZGI2OWU2ZGY4NjBhOGFlN2UyYTQ5MDUzOWI1YTRhOTUwOTNkNWFhOWMyNDk3MzBjZWIxNTQ5OGM0ZTJiZjhhMzk1MzkzZjY4NWI1N2JiY2YxODI1NTdkYzJkYjNkY2IwZjMyMWI4NjkxYzE2ZTdmZTQ"
            })
          });
      
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
      
          const data = await response.json();
          console.log('??? -data', data);
          Cookies.set('authentication', data.authToken, { expires: 1/24 });
        } catch (error) {
          console.error('Error fetching auth token:', error);
        }
      };

    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event: React.SyntheticEvent) => {
        event.preventDefault();
    };

    return (
        <>
            <Grid container direction="column" justifyContent="center" spacing={2}>
                <Grid item xs={12} container alignItems="center" justifyContent="center">
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle1">Inicia sesión con usuario y contraseña</Typography>
                    </Box>
                </Grid>
            </Grid>

            <Formik
                initialValues={{
                    email: '',
                    password: '',
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string().email('Debe ser un correo válido').max(255).required('El correo es obligatorio'),
                    password: Yup.string().max(255).required('La contraseña es obligatoria')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        await firebaseEmailPasswordSignIn(values.email, values.password).then(
                            () => {
                                
                                fetchAuthToken();
                            },
                            (err: any) => {
                                console.error('error', err);
                                if (scriptedRef.current) {
                                    setStatus({ success: false });
                                    let errorMessage = err.message;
                                    if (err.code === 'auth/invalid-login-credentials') {
                                        errorMessage = 'Correo electrónico o contraseña incorrectos. Por favor, intenta de nuevo.';
                                    }
                                    setErrors({ submit: errorMessage });
                                    setSubmitting(false);
                                }
                            }
                        );
                    } catch (err: any) {
                        console.error(err);
                        if (scriptedRef.current) {
                            setStatus({ success: false });
                            setErrors({ submit: err.message });
                            setSubmitting(false);
                        }
                    }
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit} {...others}>
                        <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
                            <InputLabel htmlFor="outlined-adornment-email-login">Correo electrónico</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-email-login"
                                type="email"
                                value={values.email}
                                name="email"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                label="Correo electrónico"
                                inputProps={{}}
                            />
                            {touched.email && errors.email && (
                                <FormHelperText error id="standard-weight-helper-text-email-login">
                                    {errors.email}
                                </FormHelperText>
                            )}
                        </FormControl>

                        <FormControl
                            fullWidth
                            error={Boolean(touched.password && errors.password)}
                            sx={{ ...theme.typography.customInput }}
                        >
                            <InputLabel htmlFor="outlined-adornment-password-login">Contraseña</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password-login"
                                type={showPassword ? 'text' : 'password'}
                                value={values.password}
                                name="password"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            size="large"
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Contraseña"
                                inputProps={{}}
                            />
                            {touched.password && errors.password && (
                                <FormHelperText error id="standard-weight-helper-text-password-login">
                                    {errors.password}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={checked}
                                        onChange={(event) => setChecked(event.target.checked)}
                                        name="checked"
                                        color="primary"
                                    />
                                }
                                label="Recuérdame"
                            />
                            <Typography
                                variant="subtitle1"
                                component={Link}
                                to={
                                    loginProp
                                        ? `/forgot${loginProp}`
                                        : '/forgot'
                                }
                                color="secondary"
                                sx={{ textDecoration: 'none' }}
                            >
                                ¿Olvidaste tu contraseña?
                            </Typography>
                        </Stack>
                        {errors.submit && (
                            <Box sx={{ mt: 3 }}>
                                <FormHelperText error>{errors.submit}</FormHelperText>
                            </Box>
                        )}

                        <Box sx={{ mt: 2 }}>
                            <AnimateButton>
                                <Button
                                    disableElevation
                                    disabled={isSubmitting}
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                >
                                    Ingresar
                                </Button>
                            </AnimateButton>
                        </Box>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default FirebaseLogin;