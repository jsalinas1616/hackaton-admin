// material-ui
import { useTheme } from '@mui/material/styles';
import logo from 'assets/images/lambdaLegentsLogo.png';

/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 *
 *
 */

// ==============================|| LOGO SVG ||============================== //

const Logo = () => {
    const theme = useTheme();

    return (
        /**
         * if you want to use image instead of svg uncomment following, and comment out <svg> element.
         *
         * 
         *
         */

        <div style={{textAlignLast:'center'}}>
        <img src={theme.palette.mode === 'dark' ? logo: logo} alt="Berry" width="100" />
        </div>

    );
};

export default Logo;
