import {
    Home,
    Box,
    DollarSign,
    Tag,
    Clipboard,
    Camera,
    AlignLeft,
    UserPlus,
    Users,
    Chrome,
    BarChart,Settings,Archive, LogIn
} from 'react-feather';

export const MENUITEMS = [
    {
        path: '/dashboard', title: 'Comenzi', icon: Home, type: 'link', badgeType: 'primary', active: false
    },
    {
        path: '/departamente', title: 'Setari echipe', icon: Box, type: 'link', badgeType: 'primary', active: false
        
    },
    {
        title: 'Fisa comanda',path:'/fisa', icon: BarChart, type: 'link', active: false
    },
    {
        title: 'Deconectare',path:'/auth/logout', icon: LogIn, type: 'link', active: false
    }
]
