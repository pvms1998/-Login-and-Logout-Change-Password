import React, { useState } from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import 'antd/dist/antd.css';
import { Form, Icon, Input, Modal } from 'antd';
import openNotificationIcon from '../../components/openNotification'
import './index.scss'

function FormRegister(props) {
    const [createUser] = useMutation(CREATE_USER)
    const { getFieldDecorator } = props.form;
    async function handleOk(e){
        e.preventDefault()
        await props.form.validateFields((err, values) => {
            if (!err){
                const { username, password } = values
                createUser({
                    variables: {
                        input: {
                            username,
                            password
                        }
                    }
                })
                .then(res => {
                    openNotificationIcon(<Icon type="check" style={{color:"green", paddingTop:22, fontSize:14}} /> ,
                            <span style={{color: "green"}}>Success</span>,
                            <span style={{color: "green"}}>Đăng kí thành công</span>,
                            {borderLeft:"solid 5px green"},
                            'success');
                    document.querySelectorAll(".ant-form.ant-form-horizontal.form-add").reset()
                })
                .catch(err1 => {
                    openNotificationIcon(<Icon type="close" style={{color:"#FF335B", paddingTop:22, fontSize:14}} /> ,
                    <span style={{color: "#FF3333"}}>Failed</span>,
                    <span style={{color: "#FF335B"}}>Username đã tồn tại</span>,
                    {borderLeft:"solid 5px #FF335B"},
                    'error');
                })
            }
        })
    }
    return (
        <Modal
            title="Register"
            visible={props.visible}
            onOk={handleOk}
            onCancel={props.handleCancel}
            >
            <Form className= "form-add">
                <Form.Item>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Username"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [
                            {
                                required: true,
                                message: 'Please input your Password!'
                            },
                            {
                                min: 1,
                                message: 'Your password must be between 1 and 8 characters'
                            },
                            {
                                max: 8,
                                message: 'Your password must be between 1 and 8 characters'
                            }
                        ]
                    })(
                        <Input.Password
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="Password"
                            style={{ fontSize: 16 }}
                        />
                    )}
                </Form.Item>
                <Form.Item >
                        
                        {getFieldDecorator('Confirm password', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input your Password!',
                                    
                                },
                                ({
                                    validator(rule, values) {
                                      if (!values || props.form.getFieldValue('password') === values) {
                                        return Promise.resolve();
                                      }
                        
                                      return Promise.reject('The two passwords that you entered do not match!');
                                    },
                                }),
                            ]
                        })(
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="Confirm Password"
                            style={{ fontSize: 16 }}
                        />
                        )}
                </Form.Item>
            </Form>
        </Modal>
    )
}

const CREATE_USER = gql`
    mutation($input: UserInput!) {
        createUser(input: $input) {
            username
            password
        }
    }
`       
export default (Form.create({ name: 'normal_login' })(FormRegister))             