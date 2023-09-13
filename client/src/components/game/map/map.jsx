import { useState } from 'react';
import s from './map.module.css';
import ClientData from '../clientData/clientData';
import HostData from '../hostData/hostData';

function Map(props) {

  let isAlient = false
  if (props.user == 'host') {
    isAlient = true
  }

  const CubeSize = 130

  const [cameraPos, setCameraPos] = useState({x: 0.0, y: 0.0})
  const [floor, setFloor] = useState(0)
  let color = '';

  let lab = ''
  for (let i = floor * props.map.height; i < props.map.height + floor * props.map.height; i++) {
    for (let j = 0; j < props.map.width; j++) {
      lab += props.map.map[i*props.map.width + j]
    }
  }

  let st
  let blocsCount = 0
  const blocks = lab.split("").map((cube) => {
    st = s.block

    if (floor == 0) {
      color = '#919191';
    } else if (floor == 1) {
      color = '#861e1e';
    } else {
      color = '#226012';
    }

    let top = ''
    let left = ''

    left = props.map.width/4*CubeSize + cameraPos.x*-CubeSize + blocsCount % props.map.width * CubeSize + 'px'
    top = props.map.height/8*CubeSize + cameraPos.y*CubeSize + Math.floor(blocsCount / props.map.width) * -CubeSize + 'px'

    blocsCount++

    if (cube == '0') {
      return
    }

    if (cube == '2') {
      color = '#d4b621';
      st = s.lift
    }

    return (
      <div
        className={st}
        key={cube}
        style={{
          backgroundColor: color,
          position: 'fixed',
          top: top,
          left: left,
          width: CubeSize + 'px',
          height: CubeSize + 'px'
        }}
      >
      </div>
    )
  })


  return (
    <>
      {blocks}
      {isAlient ? <HostData /> : <ClientData />}
    </>
  );
}

export default Map;