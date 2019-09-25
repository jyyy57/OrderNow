import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.scss';

//import router
import {Switch,Route,Redirect} from 'dva/router'

import NavBar from './NavBar';
import Home from './Home';
import About from './About';
import Admin from './Admin';
import Menus from './Menus';
import Login from './User/Login';
import Register from './User/Register';

import { Layout} from 'antd';


const { Header, Content} = Layout;

function IndexPage() {
  return (
    <Layout className={styles.layout}>
      <Header className={styles.header}>
        <NavBar />
    </Header>

      <Content className={styles.content}>
        {/*first route*/}
        <Switch>
          <Route path='/home' component={Home}/>
          <Route path='/menu' component={Menus}/>
          <Route path='/admin' component={Admin}/>
          <Route path='/about' component={About}/>
          <Route path='/login' component={Login}/>
          <Route path='/register' component={Register}/>
          {/*redirect*/}
          <Redirect to="/home"/>
        </Switch>
      </Content>
  </Layout>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
