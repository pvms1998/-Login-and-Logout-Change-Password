import React, { useState } from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import 'antd/dist/antd.css';
import { Form, Icon, Input, Button, Row, Col, Checkbox } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import openNotificationIcon from '../../../components/openNotification'
import './Login.scss'
import logo from '../../../assets/images/logo-acexis.png'
import Register from '../../register'

function FormLogin(props) {
    const [loginUser] = useMutation(USER_LOGIN)
    const { getFieldDecorator } = props.form;
    const [loading, setLoading] = useState(false)
    const [visible, setVisible] = useState(false)
    function showModal() {
        setVisible(true)
    }
    function handleCancel() {
        document.querySelector(".ant-form.ant-form-horizontal.form-add").reset()
        setVisible(false)
    }
    async function Submitlogin(e) {
        e.preventDefault()
        await props.form.validateFields((err, values) => {
            if (!err){
                const { username, password } = values
                setLoading(true)
                loginUser({
                    variables: {
                        input: {
                            username,
                            password
                        }
                    }
                })
                    .then(res => {
                        const { token } = res.data.login
                        props.context(true)
                        if(token) {
                            openNotificationIcon(<CheckOutlined style={{color:"green", paddingTop:12, fontSize:16}} />,
                            <span style={{color: "green"}}>Success</span>,
                            <span style={{color: "green"}}>Đăng nhập thành công</span>,
                            {borderLeft:"solid 5px green"},
                            'success');
                        }
                        window.localStorage.setItem('access-token', token); // lưu token lấy được vào access-token

                    })
                    .catch(err1 => {
                        setLoading(false)
                        openNotificationIcon(<Icon type="close" style={{color:"red", paddingTop:12, fontSize:16}} /> ,
                        <span style={{color: "#FF3333"}}>Failed</span>,
                        <span style={{color: "#FF335B"}}>Đăng nhập không thành công</span>,
                        {borderLeft:"solid 5px #FF335B"},
                        'error');
                        const errors = err1.graphQLErrors.map(error => error.extensions.code)
                        console.log(errors)

                    })
            } else {
                setLoading(false)
			}
        })
    }


    return (
        <>
            <Register visible={visible} handleCancel= {handleCancel} />
            <Row id="layout-login">
                
                <div id="form-demo-normal-login">
                    <Form className="login-form" onSubmit= {Submitlogin}>
                    <div className="login-form-header">
								<img
									src={logo}
									alt="logo"
									style={{
										height: '50%',
										width: '50%',
                                        paddingBottom: '20px',
                                        paddingTop: '10px'
									}}
								/>
				    </div>
                    <h2>Đăng nhập</h2>
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
									// valuePropName: 'defaultValue',
									// initialValue: '12345678',
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
									<Input
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
										type="password"
										placeholder="Password"
										style={{ fontSize: 16 }}
									/>
								)}
						</Form.Item>
                        <Form.Item>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(<Checkbox>Remember me</Checkbox>)}
                            <a className="login-form-forgot" href="">
                                Forgot password
                            </a>
                            <Button type="primary" htmlType="submit" className="login-form-button"
                                loading={loading}
                                disabled={loading}
                                icon = {"login"}
                            > Log in
                            </Button>
                            <br/>
                            Or <a onClick={showModal}>register now!</a>
                        </Form.Item>
                    </Form>
                </div>
            </Row>
        </>
    )
}
const USER_LOGIN = gql`
	mutation($input: UserInput!) {
        login(input: $input) 
        {            
            token
        }
 }
`       
export default (Form.create({ name: 'normal_login' })(FormLogin))             