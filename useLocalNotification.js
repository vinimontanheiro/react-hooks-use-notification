import { useState, useCallback } from 'react';

const useLocalNotification = () => {
  const [notification, setNotification] = useState(null);
  const [isAutoClose, setIsAutoClose] = useState(false);

  const autoClose = useCallback(
    timeout => {
      if (notification) {
        setTimeout(notification.close.bind(notification), timeout);
      }
    },
    [isAutoClose, notification],
  );

  const notify = useCallback(({ title, body, image, timeout, badge, tag, handleClick }) => {
    setIsAutoClose(timeout && timeout !== 0);
    if (!(`Notification` in window)) {
      return window.alert(`Desktop notification is not available for this browser!!`);
    }

    if (Notification.permission === `granted`) {
      const n = new Notification(title, {
        body,
        icon: image,
        badge,
        tag,
        timestamp: new Date().getTime(),
      });
      n.onclick = event => {
        handleClick(event);
      };
      setNotification(n);
      if (isAutoClose) {
        autoClose(timeout);
      }
    } else if (Notification.permission !== `denied`) {
      Notification.requestPermission(permission => {
        if (permission === `granted`) {
          const n = new Notification(title, {
            body,
            icon: image,
            badge,
            tag,
            timestamp: new Date().getTime(),
          });
          n.onclick = event => {
            handleClick(event);
          };
          setNotification(n);
          if (isAutoClose) {
            autoClose(timeout);
          }
        }
      });
    }
  }, []);

  return {
    notification,
    notify,
  };
};

export default useLocalNotification;
