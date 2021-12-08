import { notification } from "antd";
const openNotificationWithIcon = (type, message) => {
    notification[type]({
        message: message,
        placement: 'bottomLeft',
        duration: 2
    });
};
export {
    openNotificationWithIcon
}