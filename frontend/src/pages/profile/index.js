import React from 'react'
import { Form } from 'antd'
import FormProfile from './formProfile'
import { UserConsumer } from '../../configs/context';

function login() {
    const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(FormProfile);
    return <UserConsumer>
         {(context) => <WrappedNormalLoginForm context = {context} className="formProfile" ></WrappedNormalLoginForm>}
        </UserConsumer>
}

export default login