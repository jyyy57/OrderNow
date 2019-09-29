import React, {Component} from 'react'
//import {Switch} from "react-router";
import SubRoutes, {RedirectRoute} from "../../utils/SubRoutes";
import {Link, Switch} from 'dva/router';
import styles from './TabPane.scss'
export default class index extends Component{
  render() {
    const {routes,app} = this.props;
    return (
      <div className={styles.tabpane}>
      <p className={styles.title}>Contact Us</p>
      <div className={styles.content}>
        <Link to='/about/contact/phone'>Phone</Link>
        <Link to='/about/contact/address'>Address</Link>
      </div>
      {/*三级路由*/}
      <div className={styles.info}>
        <Switch>
          {routes.map((route,i) => (
            // call encapsulation component
            <SubRoutes key= {i} {...route} app={app} />
          ))}
          <RedirectRoute exact={true} from={'/about/contact'} routes={routes} />
        </Switch>
      </div>
    </div>
  );
  }
}
