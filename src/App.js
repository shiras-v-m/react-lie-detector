import { useEffect, useState } from 'react';
  import useSound from 'use-sound';
import scanningSound from './assets/scanningSound.mp3'
import inCompleteSound from './assets/incompleteSound.mp3'
import truthSound from './assets/successSound.mp3'
import lieSound from './assets/lieSound.mp3'
import './App.css';

function App() {

 

  const [play, { stop }] = useSound(
    scanningSound,
    { volume: 0.5 }
  );
    
  const [inCompleteplay, { inCompletestop }] = useSound(
    inCompleteSound,
    { volume: 0.5 }
  );
  const [truthSoundplay, { truthSoundstop }] = useSound(
    truthSound,
    { volume: 0.5 }
  );

  const [lieSoundplay, { lieSoundstop }] = useSound(
    lieSound,
    { volume: 0.5 }
  );

  var startingTime
  var endingTime
  var difference
  const [pressed,setPressed]=useState(false)
  const [completed,setCompleted]=useState(false)
  const [incomplete,setIncomplete]=useState(false)
  const [result,setResult]=useState("")
  let timeout

  function handleMouseDown(){

    setPressed(true)
   
    play()
  }
  function handleMouseUp(){
    setPressed(false)
    stop()

   

    if(!completed ){
      inCompleteplay()
    }

    
  }
  useEffect( ()=> {
    if(pressed){
      setResult('')
      startingTime=new Date()
      console.log("starting",startingTime);
      setCompleted(false)
      setIncomplete(false)
      
       timeout = setTimeout(function () {
        setPressed(false)
        setResult(false)  //EDIT THIS
        setCompleted(true)
       
    }, 4000)
    
    
    }


    if(completed && result===true && !pressed ){
      truthSoundplay()
    }

    if(completed && result===false && !pressed ){
      lieSoundplay()
    }
   
    
    
    return ()=>  {
    
      endingTime=new Date()
      
      console.log(endingTime);
      difference=startingTime-endingTime
      console.log("difference",difference);
      if(difference<4000){
        setIncomplete(true)
       
        setTimeout(()=>{
          setIncomplete(false)
        },1000)
      }
        clearTimeout(timeout)


        
    }
}, [pressed])
  

const styles={
  truth:{
      background:result===true && 'green'
  },
  lie:{
    background:result===false && 'red'
  }
}
  return (
    <>

      <div className="container" >

        <div className="detectorContainer" draggable="false"> 
          <div className="topFrame">
            <div style={styles.lie} className="lieCircleContainer">
              <div className="lieCircleInnerContainer">
              </div>
            </div>
            <div className="line"></div>
            <div style={styles.truth} className="truthCircleContainer">
              <div className="truthCircleInnerContainer">
              </div>
            </div>

          </div>
          <div className="ResultContainer">
            <div className="ResultInnerContainer">

            {(completed && result===false) &&  <p className='resultTxt' >It's totally a lie!</p>}
            {(completed && result===true) &&  <p className=' truthTxt' style={{color:"green"}} >It's truth!</p>}
            {(pressed && !completed ) &&  <p className='resultTxt' >Scanning!</p>}
            {(incomplete && !completed)  &&  <p className='resultTxt' >Scanning incomplete!</p>}
            {(!pressed && !completed && !incomplete)  &&  <p className='resultTxt' >Scanner Ready!</p>}
        
            </div>
          </div>
          <div className="fingerScannerContainer">
            <div className="fingerScannerInnerContainer" onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
              <img className='fingerScannerImage' draggable="false" src="https://www.prankscanners.com/assets/images/print_clear.png" alt="" />
            { pressed && <img className='blurPrint' src="https://www.prankscanners.com/assets/images/print_blur.png" alt="blur-print" />
}
              {/* <div className={` ${!scannerPressed ? "scanningLine" : ""}`} ></div> */}
              {pressed &&   <div className={'scanningLine'} ></div>}

</div>

          </div>
        </div>
      </div>
    </>
  );

  }
export default App;
