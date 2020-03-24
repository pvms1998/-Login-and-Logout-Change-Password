import { notification } from 'antd'
import { CheckOutlined } from '@ant-design/icons';
export default function openNotificationIcon(
    icon,
	  content,
    titile,
    style,
    type
) {
	notification[type]({
    icon: icon,
    className: 'notification',
		message: content,
		description: titile,
    placement: 'bottomRight',
    duration: 3.5,
    style: style,
	})
}
/*openNotification(e){
    notification.info({
      icon: <Icon type="check" style={{color:"green", paddingTop:12, fontSize:14}} /> ,
      message: <span style={{color: "green"}}>Success</span>,
      description:
      <span style={{color: "green"}}>Thêm thành công</span>,
      style: {borderLeft:"solid 4px green"} ,
    });
  };*/