import React from 'react';
import { Router, Switch } from 'dva/router';
// import IndexPage from './pages/IndexPage';
// import Home from './pages/Home';
// import Menus from './pages/Menus';
// import Admin from './pages/Admin';
// import About from './pages/About';
// import Login from "./pages/User/Login";
// import Register from './pages/User/Register';
import SubRoutes from './utils/SubRoutes';


//define the switch of private router,默认是开的，不让进去
const isAuthority = true;



const RouteConfig =[
  {
    path: "/",
    component: () => import("./pages/IndexPage"), //只有触发了这个链接，才会触发路由组件
    model:[],
    routes: [
      {
        path: "/home",
        component:() => import("./pages/Home"),
        model:[import('./models/home')],
        redirect: true,
        isAuthority
      },
      {
        path: "/menu",
        component: () => import("./pages/Menus"),
        model:[],
        isAuthority
      },
      {
        path: "/admin",
        component: () => import("./pages/Admin"),
        model:[],
        isAuthority
      },
      {
        path: "/about",
        component: () => import("./pages/About"),
        model:[],
        isAuthority,
        routes: [
          {
            path: '/about/history',
            model: [],
            component: () => import('./pages/About/History')
          },
          {
            path: '/about/contact',
            model: [],
            component: () => import('./pages/About/Contact')
          },
          {
            path: '/about/delivery',
            model: [],
            component: () => import('./pages/About/Delivery')
          },
          {
            path: '/about/ordering',
            model: [],
            component: () => import('./pages/About/Ordering')
          }
        ]
      },
      {
        path: "/login",
        component: () => import("./pages/User/Login"),
        model:[],
      },
      {
        path: "/register",
        component: () => import('./pages/User/Register'),
        model:[],
      }
    ]
  }
];

function RouterConfig({ history,app }) {
  return (
    <Router history={history}>
      <Switch>
        {RouteConfig.map((route,i) => (
          // call encapsulation component
          <SubRoutes key= {i} {...route} app={app}  />
        ))}
      </Switch>
    </Router>
  );
}

export default RouterConfig;
