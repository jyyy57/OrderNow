import React, {Component} from 'react'
import Logo from 'Assets/icon.png'
import style from './account.scss';
import {Form, Input, Button} from 'antd';
export default class index extends Component{
  render() {
    return <div className={style.account}>
      <img src={Logo} alt='my logo' className={style.logo} />
      <Form className='account-form'>
        <Form.Item label='Email'>
          <Input/>
        </Form.Item>
        <Form.Item label='Password'>
          <Input/>
        </Form.Item>
        <Form.Item label='Confirm Password'>
          <Input/>
        </Form.Item>
        <Form.Item>
          <Button className='btn' type='primary'>Register</Button>
        </Form.Item>
      </Form>
    </div>;
  }
}
