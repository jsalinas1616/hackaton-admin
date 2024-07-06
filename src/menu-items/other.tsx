// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconBrandChrome, IconHelp, IconSitemap } from '@tabler/icons';

import { NavItemType } from 'types';

// constant
const icons = {
    IconBrandChrome,
    IconHelp,
    IconSitemap
};

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const other: NavItemType = {
    id: 'sample-docs-roadmap',
    icon: IconBrandChrome,
    type: 'group',
    children: [
        {
            id: 'dashboard',
            title: <FormattedMessage id="dashboard" />,
            type: 'item',
            url: '/dashboard',
            icon: icons.IconBrandChrome,
            breadcrumbs: false
        },
        {
            id: 'product-page',
            title: <FormattedMessage id="Producto" />,
            type: 'item',
            url: '/product-page',
            icon: icons.IconBrandChrome,
            breadcrumbs: false
        },
        {
            id: 'campaigns',
            title: <FormattedMessage id="Campañas" />,
            type: 'item',
            url: '/campaigns',
            icon: icons.IconBrandChrome,
            breadcrumbs: false
        }
    ]
};

export default other;
