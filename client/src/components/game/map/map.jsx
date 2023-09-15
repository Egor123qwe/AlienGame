import { useEffect, useState } from 'react';
import s from './map.module.css';
import ClientData from '../clientData/clientData';
import HostData from '../hostData/hostData';
import TypeWarning from '../typeWarnings/typeWarnings';

function Map(props) {

  let isAlient = false
  if (props.user == 'host') {
    isAlient = true
  }

  let GeneralMessage = ""
  //lift 
  //block

  const Speed = 0.15
  const UserSize = 75
  const CubeSize = 130

  const [enemyPos, setEnemyPos] = useState({x: 0.0, y: 0.0})
  const [enemyFloor, setEnemyFloor] = useState(0)

  const [cameraPos, setCameraPos] = useState({x: 29.0, y: isAlient ? 1.0 : 29.0})
  const [floor, setFloor] = useState(isAlient ? 0 : 2)
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

    left = window.innerWidth/2 + cameraPos.x*-CubeSize + blocsCount % props.map.width * CubeSize + 'px'
    top = window.innerHeight/2 + cameraPos.y*CubeSize + Math.floor(blocsCount / props.map.width) * -CubeSize + 'px'

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
        key={blocsCount}
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


  const User = (isAlient, Pos, root) => {  
    console.log(Pos)
    let left
    let top
    if (isAlient != root) {
      left = window.innerWidth/2 - cameraPos.x*CubeSize + CubeSize/2-UserSize/2  + 'px'
      top = window.innerHeight/2 + cameraPos.y*CubeSize + CubeSize/2-UserSize/2 + 'px'
    } else {
      left = window.innerWidth/2 + CubeSize/2-UserSize/2  + 'px'
      top = window.innerHeight/2 + CubeSize/2-UserSize/2 + 'px'
    }


    
    return (
      <div
        className={isAlient ? s.Alient : s.Piople}
        style={{
          position: 'fixed',
          left: left,
          top: top,
          zIndex: 100,
          width: UserSize + 'px',
          height: UserSize + 'px'
        }}
      >
      </div>
    )
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case 'ArrowDown':
          setCameraPos({x: cameraPos.x, y: (cameraPos.y - Speed)})
          break
        case 'ArrowUp':
          setCameraPos({x: cameraPos.x, y: (cameraPos.y + Speed)})
          break
        case 'ArrowLeft':
          setCameraPos({x: cameraPos.x - Speed, y: (cameraPos.y)})
          break
        case 'ArrowRight':
          setCameraPos({x: cameraPos.x + Speed, y: (cameraPos.y)})
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  
  }, [cameraPos]);


  return (
    <>
      {User(isAlient, cameraPos, isAlient)}
      {enemyFloor === floor ? User(!isAlient, enemyPos, isAlient) : null}
      {blocks}
      {isAlient ? <HostData ifloor={floor} floor={enemyFloor}/> 
                : <ClientData ifloor={floor} floor={enemyFloor}/>}

      <TypeWarning message={GeneralMessage} />
    </>
  );
}

export default Map;