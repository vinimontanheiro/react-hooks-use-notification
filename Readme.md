## React Hook for browser local notification

## Dependencies:

- [React Hooks](https://pt-br.reactjs.org/docs/hooks-intro.html)
- [Notification - Browser compatibility](https://developer.mozilla.org/en-US/docs/Web/API/notification)
  
### Sample
```
import React, { useCallback } from 'react';
import useLocalNotification from './useLocalNotification';

const styles = {
  padding: `10px`,
};

const YourComponent = () => {

  const { notify } = useLocalNotification();

  const send = useCallback(
    () => {
      const title = `Title`;
      const image = `https://png.pngtree.com/svg/20170719/ec5498919c.png`;
      const badge = `https://png.pngtree.com/svg/20170719/ec5498919c.png`;
      const tag = "xxx";
      const body = "<strong>Hello!!</strong>";
      notify({
        title,
        body,
        image,
        badge,
        tag,
        timeout: 5000,
        handleClick: () => {
          console.log('Notification tapped!')
        },
      });
    },
    [],
  );

  return (
    <div style={{ ...styles }}> 
      <button type="button" name="button" onClick={send}>Send</button>
    </div>
  );
};

export default YourComponent;
```