import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Account from './dstk'
import Loading from '../../../components/loading'
import Profile from './profile'

function FormProfile(props) {
    const {data, loading} = useQuery(ALL_USER, {fetchPolicy: 'network-only'})
    const data1 = useQuery(ME)
    if(loading)
    {
        return <Loading />
    }
    else {
        return (
        <> 
        {
            (data1.data.me.role == "ADMIN" ) ?
            <div className="container-fluid">
                 <h1 className="display-4 text-center">Quản lý tài khoản</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Chế độ</th>
                            <th>Hành động</th>
                        </tr>    
                    </thead>
                    <tbody>
                        { 
                            data.user.map((tk,index) => <Account tk={tk} key ={index} alluser= {ALL_USER} />)
                        }
                    </tbody>
                </table>
            </div> :
            <Profile me={data1.data.me} />
        }
        </>
        )
    }
}
const ALL_USER = gql`
    query{
        user {
            _id
            username
            activate
        }
    }
`
const ME = gql`
    query{
        me {
            _id
            username
            role
        }
    }
`
export default FormProfile