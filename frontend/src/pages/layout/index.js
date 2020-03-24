import React from 'react'
import Logout from './logout'
import { UserConsumer } from '../../configs/context'
import { routes } from '../../routes'
import { Layout, Menu, Icon, Input, AutoComplete, Badge } from 'antd'
import logo from '../../assets/images/logo-acexis.png'
import gql from 'graphql-tag'
import './index.scss'
import { useQuery } from '@apollo/react-hooks'
import Loading from '../../components/loading'


function LayoutDesign(props) {

    const {data, loading, error} = useQuery(ME, {fetchPolicy: 'network-only'})
    const { Header, Content } = Layout
    const { history } = props.children.props
    const height = window.innerHeight
    const width = window.innerWidth
    let indexSlider
    for (let index = 0; index < routes.length; index++) {
        if (routes[index].label === props.children.props.label) {
            indexSlider = index - 1;
            break
        }
    }
    if (loading && !error) {
        return <Loading />
    }
    else {
    return (
        <Layout
            className = "Layout1"
            style={{ height: `${height}px`}}
        >
            <div
                id ="mySlider"
                style = {{background: '#000022'}} 
            >
                <div className="logo">
                    <img
                    src={logo}
                    alt="logo"
                    style={{
                        height: '50%',
                        width: '50%',
                        paddingBottom: '20px',
                        paddingTop: '20px',
                        marginBottom: '20px'
                    }}
                />
                </div>
                <Menu defaultSelectedKeys={[indexSlider.toString()]}>
                    <Menu.Item  key="0" onClick={() => history.push('/home')}>
                        <Icon  type="home" style={{fontSize: '23px', paddingTop: '7px'}} />
                        <span className="nav-text">Home</span>
                    </Menu.Item>
                    {
                        data.me.role === "ADMIN" ?
                        <Menu.Item  key="1" onClick={() => history.push('/profile')}>
                        <Icon  type="user" style={{fontSize: '23px',paddingTop: '7px'}}/>
                            <span className="nav-text">{data ? data.me.username : 'No name'}</span>
                        </Menu.Item> 
                        : 
                        <Menu.Item  key="1" onClick={() => history.push('/profile')}>
                        <Icon  type="user" style={{fontSize: '23px',paddingTop: '7px'}}/>
                            <span className="nav-text">{data ? data.me.username : 'No name'}</span>
                        </Menu.Item>
                    }
                    <Menu.Item  key="2" onClick={() => history.push('/message1')}>
                        <Badge dot={true}>
                            <Icon  type="message" style={{fontSize: '23px',paddingTop: '7px'}}/>
                            <span className="nav-text">Message</span>

                        </Badge>
                    </Menu.Item>
                    <Menu.Item key="3" onClick={() => history.push('/stream')}>
                            <Icon  type="global" style={{fontSize: '23px',paddingTop: '7px'}}/>
                            <span className="nav-text">Active stream</span>
                    </Menu.Item>
                    <Menu.Item  key="4" onClick={() => history.push('/friend')}>
                        <Icon type="team" style={{fontSize: '23px',paddingTop: '7px'}}/>
                        <span className="nav-text">Friend</span>
                    </Menu.Item>
                    <Menu.Item>
                    <UserConsumer>
                        {(context) => <Logout context={context} history = {history} ></Logout>}
                    </UserConsumer>
                    </Menu.Item>
                </Menu>

            </div>
            <Content >
                <div style={{ padding: 24, background: '#fff', minHeight: "100%" }}>{props.children}</div>
            </Content>
        </Layout>
    )
    }
}
const ME = gql`
    query{
        me {
            _id
            username 
            role
        }
    }
`
export default LayoutDesign