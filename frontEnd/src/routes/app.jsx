import Dashboard from 'views/Dashboard/Dashboard';
import Rating from 'views/Rating/Rating';
import Category from 'views/Category/Category';
import Forms from 'views/Forms/RegularForms';

const appRoutes = [
    { path: "/dashboard", name: "Charts", icon: "pe-7s-graph", component: Dashboard },
    { path: "/rating", name: "Risk Rating", icon: "pe-7s-calculator", component: Rating },
    { path: "/category", name: "Risk Category", icon: "pe-7s-note2", component: Category },
    { path: "/form", name: "Add Customer", icon: "pe-7s-users", component: Forms },
    { redirect: true, path:"/", to:"/dashboard", name: "Dashboard" }
];

export default appRoutes;
