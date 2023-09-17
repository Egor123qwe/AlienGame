import s from './client.module.css';
import instance from '../../../../API/API';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';

function Client(props) {

  const [value, setMyValue] = useState('');
  const [error, setError] = useState(false);
  const [isFind, setFind] = useState(false);

  let onConnect = () => {
    setError(false)
    instance.post('client', {code: value})
      .then(response => setFind(true))
      .catch(error => setError(true))
  }

  const handleInputChange = (event) => {
    setMyValue(event.target.value);
  }

  if (isFind) {
    return <Navigate to={"AlienGame/game/" + value + "/client"}/>
  }

  return (
    <>
      <input onChange={handleInputChange} value={value}
            type="text" name="code" placeholder="code" id={s.input} className={s.code}>
      </input>
      <div onClick={ onConnect } id={s.submitBtn} className={s.btn}>
        <span className={s.border}></span>Submit
      </div>
      { error ? <div className={s.errorMessage}>Game not found</div> : null } 
    </>
  );
}

export default Client;