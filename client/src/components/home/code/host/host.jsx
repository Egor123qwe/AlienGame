import { useLocation, useParams } from 'react-router-dom';
import s from './host.module.css';
import CopyToClipboard from 'react-copy-to-clipboard';

function Host() {

  let params = useParams();

  return (
    <>
      <CopyToClipboard text={params.code}>
        <div id={s.hostBtn} className={s.btn}><span className={s.border}></span>code: {params.code}</div>
      </CopyToClipboard>
    </>
  );
}

export default Host;