// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Button, FormControl, FormHelperText, InputLabel, OutlinedInput } from '@mui/material';
import { useDispatch } from 'store';
import { useNavigate } from 'react-router-dom';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';
import useAuth from 'hooks/useAuth';
import useScriptRef from 'hooks/useScriptRef';
import { openSnackbar } from 'store/slices/snackbar';

// ========================|| FIREBASE - FORGOT PASSWORD ||======================== //

const AuthForgotPassword = ({ ...others }) => {
    const theme = useTheme();
    const scriptedRef = useScriptRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { resetPassword } = useAuth();

    return (
        <Formik
            initialValues={{
                email: '',
                submit: null
            }}
            validationSchema={Yup.object().shape({
                email: Yup.string().email('Debe ser un correo electrónico válido').max(255).required('El correo electrónico es obligatorio')
            })}
            onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                try {
                    await resetPassword(values.email);

                    if (scriptedRef.current) {
                        setStatus({ success: true });
                        setSubmitting(false);
                        dispatch(
                            openSnackbar({
                                open: true,
                                message: 'Revisa tu correo para el enlace de restablecimiento de contraseña',
                                variant: 'alert',
                                alert: {
                                    color: 'success'
                                },
                                close: false
                            })
                        );
                        setTimeout(() => {
                            navigate('/login', { replace: true });
                        }, 1500);
                    }
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
                        <InputLabel htmlFor="outlined-adornment-email-forgot">Correo Electrónico / Nombre de Usuario</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-email-forgot"
                            type="email"
                            value={values.email}
                            name="email"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            label="Correo Electrónico / Nombre de Usuario"
                            inputProps={{}}
                        />
                        {touched.email && errors.email && (
                            <FormHelperText error id="standard-weight-helper-text-email-forgot">
                                {errors.email}
                            </FormHelperText>
                        )}
                    </FormControl>

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
                                Enviar Correo
                            </Button>
                        </AnimateButton>
                    </Box>
                </form>
            )}
        </Formik>
    );
};

export default AuthForgotPassword;