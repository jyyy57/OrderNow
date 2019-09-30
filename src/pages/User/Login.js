import React, { Component } from 'react';
import { Form, Input, Button, Message} from 'antd';
import { email_reg, pwd_reg } from '../../utils/Regexp.js';
import { connect } from 'dva';
import Request from '../../utils/Request';
import Logo from 'Assets/icon.png';
import style from './account.scss';

@connect()
class index extends Component {
  // 自定义表单校验规则
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

  // submit
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { email, pwd } = values;
        Request('users.json').then(res => {
          // console.log(res);
          const { data, status } = res;
          if (res && status === 200 && data) {
            let users = [];
            for (const key in data) {
              // console.log(data[key]);
              users.push({
                ...data[key],
                key
              });
            }
            // console.log(users);
            // 账户密码匹配
            users = users.filter(user => {
              return user.pwd === pwd && user.email === email;
            });
            // console.log(users);
            // 判断users下是否有内容
            if (users && users.length) {
              // 存到local storage
              localStorage.setItem('email', users[0].email);
              localStorage.setItem('key', users[0].key);

              // 存储到models里
              this.props
                .dispatch({
                  type: 'global/setUserInfo',
                  payload: users[0]
                })
                .then(() => {
                  // 页面跳转
                  this.props.history.push('/');
                });
            } else {
              Message.error('Email or Password error, please input again');
            }
          }
        });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={style.account}>
        <img src={Logo} alt="my logo" className={style.logo} />
        <Form className="account-form">
          <Form.Item label="Email">
            {getFieldDecorator('email', {
              rules: [
                {
                  required: true,
                  message: 'Email cannot be null, please input Email!'
                },
                {
                  pattern: email_reg,
                  validator: this.validatorForm,
                  message: 'Please input correct password：a-z,A-Z or special characters.'
                }
              ]
              // initialValue: this.state.email
            })(<Input />)}
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
                placeholder="Please input password：a-z,A-Z or special characters."
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button onClick={this.handleSubmit} className="btn" type="primary">
              SignIn
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Form.create()(index);
