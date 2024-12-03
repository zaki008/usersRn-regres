import {showMessage as showToast} from 'react-native-flash-message';

export const AllertShow = (message, type = 'success') => {
  showToast({
    message,
    // description: 'This is our second message',
    type: type,
    backgroundColor:
      type === 'success'
        ? '#1ABC9C'
        : type === 'danger'
        ? '#D9435E'
        : type === 'warning'
        ? '#dbbc67'
        : '#17a2b8',
  });
};
