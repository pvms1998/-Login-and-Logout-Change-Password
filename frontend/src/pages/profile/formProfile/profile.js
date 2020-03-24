import React, {useState} from 'react'
import { Drawer, Button, Form, Input, Icon } from 'antd'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import './index.scss'
import openNotificationIcon from '../../../components/openNotification'
import { useHistory } from 'react-router-dom'

function Profile(props) {
    const [changePassword] = useMutation(CHANGE_PASSWORD)
    const { _id } = props.me
    const [visible, setVisible] = useState(false)
    const { getFieldDecorator } = props.form
    const history = useHistory()
    function showDrawer() {
        setVisible(true)
    }
    function onClose() {
        setVisible(false)
    }
    async function handleSubmit(e) {
        e.preventDefault()
        await  props.form.validateFields((err, values) => {
            if(!err) {
                const {oldpassword, password} = values
                changePassword({
                    variables: {
                        id: _id,
                        oldpassword: oldpassword,
                        password: password
                    }
                })
                .then(res=> {
                    openNotificationIcon(<Icon type="check" style={{color:"green", paddingTop:12, fontSize:16}} />,
                            <span style={{color: "green"}}>Success</span>,
                            <span style={{color: "green"}}>Thay đổi mật khẩu thành công</span>,
                            {borderLeft:"solid 5px green"},
                            'success');
                    if(res.data.changePassword) {
                        window.localStorage.clear()
                    }
                    //history.push('/home')
                })
                .catch(err1 => {
                    openNotificationIcon(<Icon type="close" style={{color:"red", paddingTop:12, fontSize:16}} /> ,
                    <span style={{color: "#FF3333"}}>Failed</span>,
                    <span style={{color: "#FF335B"}}>Thay đổi mật khẩu thất bại</span>,
                    {borderLeft:"solid 5px #FF335B"},
                    'error');
                })
            }
        })
    }
    return(
        <>
            <h2> Hello {props.me.username}</h2>
            
            <div className="information">
                <h3>Thông tin cơ bản</h3>
                <li>Username: {props.me.username}</li>
                <li>Password: <a onClick={showDrawer}> Change Password </a></li>
            </div>
            <Drawer
                title="Change Password"
                width={320}
                onClose={onClose}
                visible={visible}
                getContainer={false}
                bodyStyle={{ paddingBottom: 80 }}
                closable={true}
                mask= {false}
                maskClosable= {false}
            >
          <Form className= "form-changepass">
          <Form.Item>
                    {getFieldDecorator('oldpassword', {
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
                            placeholder="Old Password"
                            style={{ fontSize: 16 }}
                        />
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
            <div className="draw-footer">
                      <Button onClick={handleSubmit} type="primary" style={{width: '80%', height: '80%'}}>
                        Submit
                      </Button>
            </div>
        </Drawer>
        </>
    )
}
const CHANGE_PASSWORD = gql`
    mutation($id: String!, $oldpassword: String!, $password: String!) {
        changePassword(id: $id, oldpassword: $oldpassword, password: $password)
    }
`
export default (Form.create()(Profile))    