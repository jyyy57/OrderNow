import React from 'react'
import {Redirect, Route} from 'dva/router';
import NoMatch from '../components/NoMatch';
// export default function SubRoutes(route) {
//   console.log(route);
//   return (
//       <Route render = {props => <route.component {...props} routes={route.routes} />}
//              />
//   );
// }
export default function SubRoutes({routes,component:Component}) {
  return (
    <Route render = {props => <Component {...props} routes={routes} />} />
  )
}
//重定向 封装
export function RedirectRoute({routes, from, exact}) {
// 遍历routes
  const routeR = routes.filter(item => {
    return item.redirect;
    }
  );
  //routeR就是定义为true的home
  const to = routeR.length ? routeR[0].path : routes[0].path;
  return <Redirect exact={exact} from={from} to={to} />;
}

 //NoMatchRoute
export function NoMatchRoute({status=404}) {
// 遍历routes
  return <Route render = {props => <NoMatch {...props} status={status} />} />;
}

