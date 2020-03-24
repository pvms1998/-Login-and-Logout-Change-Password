import React from 'react'
import { Icon } from 'antd'
import  openNotificationIcon  from '../../../components/openNotification'

function Logout(props) {
    function confirm() {
        console.log(props)
        window.localStorage.clear()
        props.context(false)
        openNotificationIcon(<Icon type="check" style={{color:"green", paddingTop:12, fontSize:16}} /> ,
            <span style={{color: "green"}}>Success</span>,
            <span style={{color: "green"}}>Đăng xuất thành công</span>,
            {borderLeft:"solid 5px green"},
            'success');
    }
    return (
        <div onClick={confirm} > 
            <Icon type="logout" style={{fontSize: '23px'}}></Icon>
            <span className="nav-text">Logout</span>
        </div>
    )
}
export default Logout