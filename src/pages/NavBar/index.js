import React, { Component } from 'react';
import { Menu } from 'antd';
import { Link } from 'dva/router';
import style from './index.scss';

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedKeys:[]
    };
  }
//when we refresh the web page, the components will be reloaded, and run componentDidMount(cdm) function
  // in order to solve the desynchrony of page and route
  componentDidMount() {
    this.handleSetSelectedKeys(this.props.location.pathname);
  }

  UNSAFE_componentWillReveiveProps(nextProps) {
    const { pathname } = this.props.location;
    if (nextProps.location.pathname !== pathname) {
      //when the route changes, we change the current key value
      this.handleSetSelectedKeys(nextProps.location.pathname);
    }
  }

  handleSetSelectedKeys(pathname) {
    // /admin = ["/","admin"]
    // according'/', split route address into array
    const temp = pathname.split('/');
    //if the length of array < 2, means only has root address/, set it as Home, otherwise, we select the second value of the array
    const key = temp && temp.length < 2 ? "home" : temp[1];
    this.setState({
      selectedKeys: [key]
    });
  }
  render()
  {
    return (
      <nav className={style.header}>
        <a className={style.logo} href="http://www.google.com">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="d-block mx-auto"
          >
            <circle cx="12" cy="12" r="10"/>
            <line x1="14.31" y1="8" x2="20.05" y2="17.94"/>
            <line x1="9.69" y1="8" x2="21.17" y2="8"/>
            <line x1="7.38" y1="12" x2="13.12" y2="2.06"/>
            <line x1="9.69" y1="16" x2="3.95" y2="6.06"/>
            <line x1="14.31" y1="16" x2="2.83" y2="16"/>
            <line x1="16.62" y1="12" x2="10.88" y2="21.94"/>
          </svg>
        </a>
        <Menu className={style['menu-left']}
              mode="horizontal"
              defaultSelectedKeys={["home"]}
              selectedKeys={[this.state.selectedKeys]}
        >
          <Menu.Item key={'home'}>
            <Link to='/home'>Home</Link>
          </Menu.Item>
          <Menu.Item key={"menu"}>
            <Link to='/menu'>Menu</Link>
          </Menu.Item>
          <Menu.Item key={"admin"}>
            <Link to='/admin'>Admin</Link>
          </Menu.Item>
          <Menu.Item key={"about"}>
            <Link to='/about'>About</Link>
          </Menu.Item>
          <Menu.Item key={"login"}>
            <Link to='/login'>Login</Link>
          </Menu.Item>
          <Menu.Item key={"register"}>
            <Link to='/register'>Register</Link>
          </Menu.Item>
        </Menu>
      </nav>
    );
  }
}
