//Layouts
import LayoutAdmin from '../layouts/LayoutAdmin';
import LayoutBasic from '../layouts/LayoutBasic';
//Admin Pages
import AdminHome from "../pages/Admin";
import AdminSingIn from "../pages/Admin/SignIn/SignIn";

//Pages
import Home from '../pages/Home';
import Contact from '../pages/Contact'

//Other pages
import Error404 from '../pages/Error404';

const routes=[
    {
        path: "/admin",
        component: LayoutAdmin,
        exact: false,
        routes:[
            {
                path: "/admin",
                component: AdminHome,
                exact:true
            },
            {
                path: "/admin/login",
                component: AdminSingIn,
                exact:true
            },
            {
                component: Error404
            }
        ]
    },
    {
        path: "/",
        exact: false,
        component: LayoutBasic,
         routes:[
             {
                 path:"/",
                 component: Home,
                 exact: true
             }, 
             {
                 path: "/Contact",
                 component: Contact,
                 exact: true
             },
             {
                 component: Error404
             }
         ]
    }
];

export default routes;