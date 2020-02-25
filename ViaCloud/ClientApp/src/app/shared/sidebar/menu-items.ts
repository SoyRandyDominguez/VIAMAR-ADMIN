import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
    //{
    //  path: '',
    //  title: 'Personal',
    //  icon: 'mdi mdi-dots-horizontal',
    //  class: 'nav-small-cap',
    //  extralink: true,
    //  labelClass:'',
    //  submenu: []
    //},
    {
        path: '/home',
        title: 'Home',
        label: '',
        icon: 'mdi mdi-home',
        class: '',
        labelClass: '',
        extralink: false,
        submenu: []
    },
    //{
    //  path: '',
    //  title: 'UI Components',
    //    icon: 'mdi mdi-dots-horizontal',
    //    labelClass: '',
    //  class: 'nav-small-cap',
    //  extralink: true,
    //  submenu: []
    //},
    {
        path: '',
        title: 'Servicios',
        icon: 'mdi mdi-bullseye',
        labelClass: '',
        label: '',
        class: 'has-arrow',
        extralink: false,
        submenu: [
            {
                path: '/servicios/citas',
                label: '',
                labelClass: '',
                title: 'Citas',
                icon: 'mdi mdi-calendar',
                class: '',
                extralink: false,
                submenu: []
            },

        ]
    }
];
