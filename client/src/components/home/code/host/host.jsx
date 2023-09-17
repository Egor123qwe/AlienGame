import { Navigate, useLocation, useParams } from 'react-router-dom';
import s from './host.module.css';
import CopyToClipboard from 'react-copy-to-clipboard';
import { useEffect, useState } from 'react';
import instance, { baseURL } from '../../../../API/API';
import { w3cwebsocket as WebSocket } from 'websocket';

function Host() {

  const [isFind, setFind] = useState(false);
  const [value, setValue] = useState('');

  let GameWait = (value) => {
      const ws = new WebSocket('ws://' + baseURL + 'wait');
      ws.onopen = () => ws.send(value) 
      ws.onmessage = (event) => setFind(true)
      return () => ws.close();
  }

  useEffect(() => {
    instance.get('host')
      .then(response => {
        setValue(response.data.code)
        GameWait(response.data.code)
      })
      .catch(error => {});
  }, []);

  if (isFind) {
    return <Navigate to={"AlienGame/game/" + value + "/host"}/>
  }

  return (
    <>
      <CopyToClipboard text={value}>
        <div id={s.hostBtn} className={s.btn}><span className={s.border}></span>code: {value}</div>
      </CopyToClipboard>
    </>
  );
}

export default Host;