import React, {Component} from 'react'
import style from "./account.scss";
import {Button, Form, Input} from "antd";
import Logo from 'Assets/icon.png'

export default class index extends Component{
  render() {
    return (
      <div className={style.account}>
      <img src={Logo} alt='my logo' className={style.logo} />
      <Form className='account-form'>
        <Form.Item label='Email'>
          <Input/>
        </Form.Item>
        <Form.Item label='Password'>
          <Input/>
        </Form.Item>
        <Form.Item>
          <Button className='btn' type='primary'>SignIn</Button>
        </Form.Item>
      </Form>
    </div>
    )
  }
}
