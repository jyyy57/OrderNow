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

const RouteConfig =[
  {
    path: "/",
    component: () => import("./pages/IndexPage"), //只有触发了这个链接，才会触发路由组件
    model:[],
    routes: [
      {
        path: "/home",
        component:() => import("./pages/Home"),
        model:[],
        redirect: true
      },
      {
        path: "/menu",
        component: () => import("./pages/Menus"),
        model:[],
      },
      {
        path: "/admin",
        component: () => import("./pages/Admin"),
        model:[],
      },
      {
        path: "/about",
        component: () => import("./pages/About"),
        model:[],
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
