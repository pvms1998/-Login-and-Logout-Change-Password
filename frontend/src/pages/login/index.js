import React from 'react'
import { Form } from 'antd'
import { UserConsumer } from '../../configs/context';
import FormLogin from './formLogin'

function login() {
    const LoginForm = Form.create({ name: 'normal_login' })(FormLogin);
    return <UserConsumer>
         {(ctx) => <LoginForm context = {ctx} className="formLogin" ></LoginForm>}
        </UserConsumer>
}

export default login