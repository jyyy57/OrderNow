import React, {Component} from 'react'
import  {Tabs} from 'antd';
import style from './index.scss'
//import {Switch} from "react-router";
import SubRoutes, {RedirectRoute} from "../../utils/SubRoutes";
import { Switch } from 'dva/router';

const {TabPane} = Tabs;
export default class index extends Component{
  render() {
    const { routes, app } = this.props;
    return (
      <div className={style.about}>
        <Tabs className={style.tabs} tabPosition={'left'}>
          <TabPane tab="Order History" key="Order History" />
          <TabPane tab="Contact Us" key="Contact Us" />
          <TabPane tab="Order Documentation" key="Order Documentation" />
          <TabPane tab="Delivery Information" key="Delivery Information" />
        </Tabs>
        <div className={style.routes}>
          {/*二级 route*/}
          <Switch>
            {routes.map((route,i) => (
              // call encapsulation component
              <SubRoutes key= {i} {...route} app={app} />
            ))}
            <RedirectRoute exact={true} from={'/about'} routes={routes} />
          </Switch>
        </div>
      </div>
    )
  }
}
