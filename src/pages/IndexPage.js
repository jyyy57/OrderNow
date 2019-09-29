import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.scss';

//import router
import {Switch} from 'dva/router'
import NavBar from './NavBar';
// import Home from './Home';
// import About from './About';
// import Admin from './Admin';
// import Menus from './Menus';
// import Login from './User/Login';
// import Register from './User/Register';

import { Layout} from 'antd';
import SubRoutes,{ RedirectRoute, NoMatchRoute} from "../utils/SubRoutes";


const { Header, Content} = Layout;

function IndexPage(props) {
  //console.log(props);
  const { routes,app } = props;
  console.log(routes);
  return (
    <Layout className={styles.layout}>
      <Header className={styles.header}>
        <NavBar {...props}/>
    </Header>

      <Content className={styles.content}>
        {/*first route*/}
        <Switch>
          {/*<Route path='/home' component={Home}/>*/}
          {/*<Route path='/menu' component={Menus}/>*/}
          {/*<Route path='/admin' component={Admin}/>*/}
          {/*<Route path='/about' component={About}/>*/}
          {/*<Route path='/login' component={Login}/>*/}
          {/*<Route path='/register' component={Register}/>*/}


          {routes.map((route,i) => (
            // call encapsulation component
            <SubRoutes key= {i} {...route} app={app} />
          ))}
          {/*redirect*/}
          /* 重定向三个属性：1.exact 严格模式，必须完全相同才会跳转；2. from从哪里开始匹配 2.跳转到哪里
          * 如果路由配置中没有redirect: true(通过循环渲染重定向） 则默认地一个路由为重定向路由，见router.js
          * 重定向封装：*/
          {/*<Redirect to="/home"/>*/}
          {/*调用subRoutes里面封装的RedirectROute*/}
          <RedirectRoute exact={true} from={'/'} routes={routes} />

          {/*输入的链接不存在时，跳转到NoMatch组件*/}
          <NoMatchRoute/>
        </Switch>
      </Content>
  </Layout>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
