import React, {Component} from 'react'
import Logo from 'Assets/icon.png'
import style from './account.scss';
import {Form, Input, Button} from 'antd';
import {email_reg,pwd_reg} from '../../utils/Regexp.js'
import Request from '../../utils/Request'
export class index extends Component{
  state = {
    email:'12'
  }
  //自定义表单校验规则
  validatorForm = (rule, value, callback) => {
    if (value && rule.pattern && !value.match(rule.pattern)) {
      callback(rule.message);
    } else {
      callback();
    }
  };
  // 自定义校验两次密码是否一致
  validatorPwd = (rule, value, callback) => {
    if (value !== this.props.form.getFieldValue('pwd')) {
      callback(rule.message);
      return;
    }
    callback();
  };
  //submit
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { email, pwd } = values;
        // 发起网络请求
        Request('/users.json', {
          method: 'post',
          data: { email, pwd }
        }).then(res => {
          // console.log(res);
          if (res.status === 200 && res.data) {
            // console.log(this.props.history);
            this.props.history.push('/login');
          }
        });
      }
    });
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    return <div className={style.account}>
      <img src={Logo} alt='my logo' className={style.logo} />
      <Form className='account-form'>
        <Form.Item label='Email'>
          {getFieldDecorator('email',
            {
              rules: [
                {
                  required:true,
                  message:'Email cannot be null, please input your Email'
                },
                // {
                //   type:'email',
                //   message:'Please input validate Email'
                // },
                {
                  pattern: email_reg,
                  validator:this.validatorForm,
                  message:'Please input correct Email'
                }

              ]
             // initialValue:this.state.email
            })(<Input/>)}
        {/*</Form.Item>*/}
        {/*<Form.Item label='Password'>*/}
        {/*  <Input/>*/}
        {/*</Form.Item>*/}
        {/*<Form.Item label='Confirm Password'>*/}
        {/*  <Input/>*/}
        </Form.Item>
        <Form.Item label="Password">
          {getFieldDecorator('pwd', {
            rules: [
              {
                required: true,
                message: 'Password cannot be null, please input password!'
              },
              {
                pattern: pwd_reg,
                validator: this.validatorForm,
                message:
                  'Please input correct password：a-z,A-Z or special characters.'
              }
            ]
          })(
            <Input
              maxLength={16}
              type="password"
              placeholder='Please input correct password：a-z,A-Z or special characters.'
            />
          )}
        </Form.Item>
        <Form.Item label="Confirm Password">
          {getFieldDecorator('aPwd', {
            rules: [
              {
                required: true,
                message: 'Password cannot be null, please input password!'
              },
              {
                pattern: pwd_reg,
                validator: this.validatorForm,
                message:
                  'Please input correct password：a-z,A-Z or special characters.'
              },
              {
                validator: this.validatorPwd,
                message: 'Please retype your password！'
              }
            ]
          })(
            <Input
              maxLength={16}
              type="password"
              placeholder="Retype Password"
            />
          )}
        </Form.Item>
        <Form.Item>
          <Button onClick={this.handleSubmit} className='btn' type='primary'>Register</Button>
        </Form.Item>
      </Form>
    </div>;
  }
}

export default Form.create()(index);
