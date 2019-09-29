import React, {Component} from 'react'
import  {Tabs} from 'antd';
import style from './index.scss'
//import {Switch} from "react-router";
import SubRoutes, {RedirectRoute} from "../../utils/SubRoutes";
import { Switch } from 'dva/router';

const {TabPane} = Tabs;
export default class index extends Component{
  //点击tab切换路由
  handleChangeTab = key => {
    //console.log(key);
    //window.location.href = "/#" + key;
    if(this.props.location.pathname != key)
    this.props.history.push(key);
  }
  render() {
    const { routes, app } = this.props;
    return (
      <div className={style.about}>
        <Tabs className={style.tabs}
              tabPosition={'left'}
              onChange={this.handleChangeTab}
              activeKey={this.props.location.pathname}
        >
          <TabPane tab="Order History" key="/about/history" />
          <TabPane tab="Contact Us" key="/about/contact"  />
          <TabPane tab="Order Documentation" key="/about/ordering"  />
          <TabPane tab="Delivery Information" key="/about/delivery"  />
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
