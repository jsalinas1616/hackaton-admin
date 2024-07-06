import { lazy } from 'react';

// project imports
import AuthGuard from 'utils/route-guard/AuthGuard';
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// sample page routing
const Dashboard = Loadable(lazy(() => import('views/dashboard')));
const ProductPage = Loadable(lazy(() => import('views/product-page')));
const Campaigns = Loadable(lazy(() => import('views/campaigns')));

// ============================== MAIN ROUTING ============================== //

const MainRoutes = {
    path: '/',
    element: (
        <AuthGuard>
            <MainLayout />
        </AuthGuard>
    ),
    children: [
        {
            path: '/',
            element: <Dashboard />
        },
        {
            path: '/dashboard',
            element: <Dashboard />
        },
        {
            path: '/product-page',
            element: <ProductPage />
        },
        {
            path: '/campaigns',
            element: <Campaigns />
        }
    ]
};

export default MainRoutes;