import {NotificationManager} from 'react-notifications';

const showNotification = (type, text) => {
    switch (type) {
        case 'info':
            NotificationManager.info(text, "Info", 2000);
            break;
        case 'success':
            NotificationManager.success(text, "Success", 1500);
            break;
        case 'warning':
            NotificationManager.warning('Warning message', 'Close after 3000ms', 3000);
            break;
        case 'error':
            NotificationManager.error(text, type, 5000, () => {
                alert('callback');
            });
            break;
    }
}

export default {showNotification}
