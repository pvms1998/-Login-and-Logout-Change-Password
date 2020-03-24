import React from 'react'
import {Button} from 'antd'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import openNotificationIcon from '../../../components/openNotification'

function Account(props) {   
    const {username, activate, _id} = props.tk
    const alluser = props.alluser
    const [deleteUser] = useMutation(DELETE_USER)
    const [activateUser] = useMutation(ACTIVATER_USER)
    function handSubmit() {
        deleteUser({
            variables: {
                username: username
            },
            refetchQueries: () => [
                {
                    query: alluser
                }
            ]
        })
    }
    function handleSubmit() {
        console.log(_id)
        activateUser({
            variables: {
                id: _id
            },
            refetchQueries: () => [{
                query: alluser
            }]
        })
    }
    return (
        <tr>
            <td>{username}</td>
            <td>{activate === false ?
                <Button type="primary"
                onClick = {handleSubmit}
                >Mở khóa</Button>
                :
                <Button type="danger"
                onClick = {handleSubmit}
                >Khóa</Button> }
            </td>
            <td>
                <Button type="danger"
                    onClick = {handSubmit}
                >Delete</Button> <span />
                <Button type="primary"
                
                >Edit</Button>
            </td>

        </tr>
    )
}

const DELETE_USER = gql `
    mutation($username: String!){
        deleteUser(username: $username)
    }
`
const ACTIVATER_USER = gql`
    mutation($id: String!){
        activateUser(id: $id){
            activate
        }
    }
`
export default Account