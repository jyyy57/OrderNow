import React from 'react'
import {Redirect, Route} from 'dva/router';
import NoMatch from '../components/NoMatch';
import dynamic from 'dva/dynamic';
import {connect} from "dva";
// export default function SubRoutes(route) {
//   console.log(route);
//   return (
//       <Route render = {props => <route.component {...props} routes={route.routes} />}
//              />
//   );
// }
//解决动态加载路由组件的方法
const dynamicCom = (app,models,component,routes,isAuthority,userInfo) =>
  dynamic({
  app,
  models: () => models,
  component: () => component().then(res => {
    if(isAuthority) {
      //判断userInfo.id是否有内容
      if(!localStorage.key || !localStorage.email) { //没有内容就跳转到login
        return () => <Redirect to="/login" />;
      }
    }
    const Component = res.default || res;
    return props => <Component {... props} app={app} routes={routes} />;
  })
});
export function SubRoutes({routes,component,app, model,isAuthority,userInfo}) {
 // console.log(userInfo)
  return <Route component={dynamicCom(app,model,component,routes,isAuthority,userInfo)} />;
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
export default connect(({global}) => ({
  userInfo: global.userInfo
})) (SubRoutes);

