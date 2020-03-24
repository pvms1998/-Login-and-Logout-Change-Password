import React from 'react'
import { Layout, Skeleton } from 'antd';
import Loading from '../../components/loading'


function home(props) {

    if (props) {
        return 'home'
    } else {
        return <Loading></Loading>
    }


}
export default (home)