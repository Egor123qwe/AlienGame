import { useEffect, useState } from 'react';
import s from './map.module.css';
import ClientData from '../clientData/clientData';
import HostData from '../hostData/hostData';
import TypeWarning from '../typeWarnings/typeWarnings';
import { Navigate } from 'react-router-dom';

function Map(props) {

  const LiftMessage = "Нажмите 1 для подъёма, 2 для спуска на лифте"
  const BlockMessage = "Нажмите пробел для захвата человека"
  const DetailMessage = "Нажмите пробел для захвата элексира"

  let isAlient = false
  if (props.user == 'host') {
    isAlient = true
  }

  const [whoWin, setwhoWin] = useState(0)
  const [isWin, setWin] = useState(false)
  const [ws, SetWs] = useState(null)
  const [GeneralMessage, setGeneralMessage] = useState("")

  const Speed = 0.25
  const UserSize = 40
  const CubeSize = 40

  const [detailPos, setDetailPos] = useState({x: 1.3, y: 0.6})
  const [detailFloor, setDetailFloor] = useState(1)
  const [detailFind, setDetailFind] = useState(false)

  const [enemyPos, setEnemyPos] = useState({x: 1.0, y: 0.0})
  const [enemyFloor, setEnemyFloor] = useState(0)

  const [cameraPos, setCameraPos] = useState({x: 29.0, y: isAlient ? 1.0 : 29.0})
  const [floor, setFloor] = useState(isAlient ? 0 : 0)
  let color = '';

  let lab = ''
  for (let i = floor * props.map.height; i < props.map.height + floor * props.map.height; i++) {
    for (let j = 0; j < props.map.width; j++) {
      lab += props.map.map[i*props.map.width + j]
    }
  }

  let st
  let blocsCount = 0

  ///////////////////
  const blocks = lab.split("").map((cube) => {
    st = s.block

    if (floor == 0) {
      color = '#919191';
    } else if (floor == 1) {
      color = '#dc1717';
    } else {
      color = '#3d9a26';
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
  ///////////////

  const Detail = () => {
    let left = window.innerWidth/2 + detailPos.x*CubeSize - cameraPos.x*CubeSize + CubeSize/2-UserSize/2  + 'px'
    let top = window.innerHeight/2 - detailPos.y*CubeSize + cameraPos.y*CubeSize + CubeSize/2-UserSize/2 + 'px'

    return (
      <div
        className={s.Elix}
        style={{
          position: 'fixed',
          left: left,
          top: top,
          zIndex: 100,
          width: UserSize / 2 + 'px',
          height: UserSize / 2 + 'px'
        }}
      >
      </div>
    )
  }



  const User = (isAlient, Pos, root) => {  
    let left
    let top
    if (isAlient != root) {
      left = window.innerWidth/2 + Pos.x*CubeSize - cameraPos.x*CubeSize + CubeSize/2-UserSize/2  + 'px'
      top = window.innerHeight/2 - Pos.y*CubeSize + cameraPos.y*CubeSize + CubeSize/2-UserSize/2 + 'px'
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
    let isNear = (pos1, pos2) => {
      if (Math.sqrt((pos1.x-pos2.x)*(pos1.x-pos2.x)+(pos1.y-pos2.y)*(pos1.y-pos2.y)) < 1.0) {
        return true
      }
      return false
    }

    const CooseMessage = () => {
        let message = ""
        if (isNear(cameraPos, {x: 1.0, y: 1.0}) || isNear(cameraPos, {x: 29.0, y: 1.0})
        ||  isNear(cameraPos, {x: 29.0, y: 29.0}) || isNear(cameraPos, {x: 1.0, y: 29.0})) {
          message = LiftMessage
        }

        if (Math.sqrt((cameraPos.x-detailPos.x)*(cameraPos.x-detailPos.x)+
        (cameraPos.y-detailPos.y)*(cameraPos.y-detailPos.y)) < 3.0) {
          if ((detailFloor == floor) && (!isAlient) && (!detailFind)) { 
            message = DetailMessage
          }
        }
        if (Math.sqrt((cameraPos.x-enemyPos.x)*(cameraPos.x-enemyPos.x)+
            (cameraPos.y-enemyPos.y)*(cameraPos.y-enemyPos.y)) < 3.0) {
              if ((enemyFloor == floor) && (isAlient)) { 
                message = BlockMessage
              }
            }
        return message
    }

    const CheckCollisions = (pos, nextPos) => {
      let f = floor * 31 * 31
      let lab = props.map.map.split("").slice(f, f + 31*31)
      let tmpPos = {x: nextPos.x + 0.5, y: nextPos.y + 0.5}
      if (lab[Math.floor((tmpPos.y)) * 31 + Math.floor(tmpPos.x)] == '1') {
       return
      }

      if (lab[Math.floor((tmpPos.y)) * 31 + Math.floor(tmpPos.x)] == undefined) {
        if (!isAlient && detailFind) {
          setWin(true)
          console.log("Человек победил")
        }
        console.log(tmpPos)
        console.log(lab[Math.floor((tmpPos.y)) * 31 + Math.floor(tmpPos.x)])
        setCameraPos({x: pos.x, y: pos.y})
        return
       }

      if (lab[Math.floor((tmpPos.y)) * 31 + Math.floor(tmpPos.x)] == '2') {
        if ((Math.floor((tmpPos.y)) == 0)
        || (Math.floor((tmpPos.y)) == 30) 
        || (Math.floor((tmpPos.x)) == 30)
        || (Math.floor((tmpPos.x)) == 0)) {
          return
        }
      }

      setCameraPos(nextPos)
    }

    const handleKeyDown = (event) => {
      let message = CooseMessage()

      switch (event.key) {
        case 'ArrowDown':
          CheckCollisions(cameraPos, {x: cameraPos.x, y: (cameraPos.y - Speed)})
          break
        case 'ArrowUp':
          CheckCollisions(cameraPos, {x: cameraPos.x, y: (cameraPos.y + Speed)})
          break
        case 'ArrowLeft':
          CheckCollisions(cameraPos, {x: cameraPos.x - Speed, y: (cameraPos.y)})
          break
        case 'ArrowRight':
          CheckCollisions(cameraPos, {x: cameraPos.x + Speed, y: (cameraPos.y)})
          break
        case '1':
          if ((floor + 1 < 3) && (message == LiftMessage)) {
            setFloor(floor + 1)  
          }
          break
        case '2':
          if ((floor - 1 >= 0) && (message == LiftMessage)) {
            setFloor(floor - 1)  
          }
          break
        case ' ':
          if (message == DetailMessage) {
              setDetailFind(true)
          }
          if (message == BlockMessage) {
            console.log("Пришелец победил")
            setWin(true)
          }
          break
      }
      setGeneralMessage(message)
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  
  }, [cameraPos, floor]);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8000/game');
    ws.onopen = () => ws.send(props.code) 
    SetWs(ws)
    return () => ws.close();
  }, []);

  useEffect(() => {
    if (ws != null) {
      ws.onmessage = (event) => {
        let obj = JSON.parse(event.data);
        if (obj.whoWin != 0) {
          setwhoWin(obj.whoWin)
        } 
        if (isAlient) {
          if (enemyPos.x != obj.pPosx || enemyPos.y != obj.pPosy) {
            setEnemyPos({x: obj.pPosx, y: obj.pPosy})
          }
          if (enemyFloor != obj.pFloor) { setEnemyFloor(obj.pFloor) }
        } else {
          if (enemyPos.x != obj.aPosx || enemyPos.y != obj.aPosy) {
            setEnemyPos({x: obj.aPosx, y: obj.aPosy})
          }
          if (enemyFloor != obj.aFloor) { setEnemyFloor(obj.aFloor) }
        }
        ws.send(JSON.stringify({x: cameraPos.x, y: cameraPos.y, floor: floor, isAlient: isAlient, isWin: isWin})) 
      }
    }
  }, [ws, cameraPos, floor, enemyPos, enemyFloor, isWin]);


  if (whoWin == 1) {
      if (isAlient) {
        return <Navigate to={"/home/result/win"}/>
      } else {
        return <Navigate to={"/home/result/lose"}/>
      }
  } 
  if (whoWin == 2) {
    if (isAlient) {
      return <Navigate to={"/home/result/lose"}/>
    } else {
      return <Navigate to={"/home/result/win"}/>
    }
  } 

  return (
    <>
      {User(isAlient, cameraPos, isAlient)}
      {enemyFloor === floor ? User(!isAlient, enemyPos, isAlient) : null}
      {!detailFind && detailFloor == floor && !isAlient ? Detail() : null}
      {blocks}
      {isAlient ? <HostData ifloor={floor} floor={enemyFloor}/> 
                : <ClientData ifloor={floor} floor={enemyFloor} isFind={detailFind}/>}

      <TypeWarning message={GeneralMessage} />
    </>
  );
}

export default Map;