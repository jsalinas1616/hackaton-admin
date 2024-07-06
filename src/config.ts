import LAYOUT_CONST from 'constant';

// types
import { ConfigProps } from 'types/config';

export const JWT_API = {
    secret: 'SECRET-KEY',
    timeout: '1 days'
};

export const FIREBASE_API = {
    apiKey: "AIzaSyB23UsPzcz6h_aoZXi0BGRZ2pSC3W8P2Ik",
    authDomain: "hackathon-2d5b3.firebaseapp.com",
    projectId: "hackathon-2d5b3",
    storageBucket: "hackathon-2d5b3.appspot.com",
    messagingSenderId: "1058311298695",
    appId: "1:1058311298695:web:73ef4432ad31b6e094e222",
    measurementId: "G-2FG82SPEV1"
};

export const AUTH0_API = {
    client_id: '7T4IlWis4DKHSbG8JAye4Ipk0rvXkH9V',
    domain: 'dev-w0-vxep3.us.auth0.com'
};

export const AWS_API = {
    poolId: 'us-east-1_AOfOTXLvD',
    appClientId: '3eau2osduslvb7vks3vsh9t7b0'
};

// basename: only at build time to set, and Don't add '/' at end off BASENAME for breadcrumbs, also Don't put only '/' use blank('') instead,
// like '/berry-material-react/react/default'
export const BASE_PATH = '';

export const DASHBOARD_PATH = '/dashboard';

export const HORIZONTAL_MAX_ITEM = 6;

const config: ConfigProps = {
    layout: LAYOUT_CONST.VERTICAL_LAYOUT, // vertical, horizontal
    drawerType: LAYOUT_CONST.DEFAULT_DRAWER, // default, mini-drawer
    fontFamily: `'Roboto', sans-serif`,
    borderRadius: 8,
    outlinedFilled: true,
    navType: 'dark', // light, dark
    presetColor: 'theme5', // default, theme1, theme2, theme3, theme4, theme5, theme6
    locale: 'es', // 'en' - English, 'fr' - French, 'ro' - Romanian, 'zh' - Chinese
    rtlLayout: false,
    container: false
};

export default config;
