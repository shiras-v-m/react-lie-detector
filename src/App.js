import { useEffect, useState } from 'react';
import backgroundImage from './assets/noise-bg.jpg'
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

  let startingTime
  let endingTime
  let difference
  const [pressed,setPressed]=useState(false)
  const [completed,setCompleted]=useState(false)
  const [incomplete,setIncomplete]=useState(false)
  const [result,setResult]=useState("")
  const [futureResult,setFutureResult]=useState(false)
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

      // To reset result for new scan
      setResult('')

      // to check the completion of scan
      startingTime=new Date()
      console.log("starting",startingTime);
      setCompleted(false)
      setIncomplete(false)
      

       timeout = setTimeout(function () {

        // To stop scanning when scanning completed
        setPressed(false)
        
        setResult(futureResult)  //EDIT THIS

        // so result when scanning completed
        setCompleted(true)
       
    }, 4000)
    
    
    }


    // if result is truth then truth sound effect plays
    if(completed && result===true && !pressed ){
      truthSoundplay()
    }

    // if result is lie then lie sound effect plays
    if(completed && result===false && !pressed ){
      lieSoundplay()
    }
   
    
    
    return ()=>  {

      // to check the completion of scan
      endingTime=new Date()
      console.log(endingTime);
      difference=startingTime-endingTime
      console.log("difference",difference);
      if(difference<4000){
        setIncomplete(true)
       
        setTimeout(()=>{
          // reset the incomplete state to false
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

  // set the result to prank your friend
  const handleClick = (event,msg) => {
    console.log(event.detail);
    console.log(msg);
    switch (event.detail) {
      
      case 2: {
        console.log('double click detected');
        window.navigator.vibrate(400);
        if(msg==='lie'){
          setFutureResult(false)
          console.log('Result set to lie');
        }
        else if(msg==='truth'){
          setFutureResult(true)
          console.log('Result set to lie');
        }
        break;
      }
      
      default: {
        break;
      }
    }
  }



  return (
    <>

      <div className="container" style={{backgroundImage:`url(${backgroundImage})` }} >

        <div className="detectorContainer" draggable="false"> 
          <div className="topFrame">
            <div onClick={(e)=>handleClick(e,"lie")} style={styles.lie} className="lieCircleContainer">
              <div className="lieCircleInnerContainer">
              </div>
            </div>
            <div className="line"></div>
            <div onClick={(e)=>handleClick(e,"truth")} style={styles.truth} className="truthCircleContainer">
              <div className="truthCircleInnerContainer">
              </div>
            </div>

          </div>
          <div className="ResultContainer">
            <div className="ResultInnerContainer">

            {(completed && result===false) &&  <p className='resultTxt' >It's totally a lie!</p>}
            {(completed && result===true) &&  <p className=' truthTxt' style={{color:"green"}} >It's truth!</p>}
            {(pressed && !completed ) &&  <p className='scanningStyle' >Scanning!</p>}
            {(incomplete && !completed)  &&  <p className='resultTxt' style={{fontSize:'23px'}} >Scanning incomplete!</p>}
            {(!pressed && !completed && !incomplete)  &&  <p className='resultTxt' >Scanner Ready!</p>}
        
            </div>
          </div>
          <div className="fingerScannerContainer">
            <div onTouchStart={handleMouseDown} className="fingerScannerInnerContainer" onMouseDown={handleMouseDown} onTouchEnd={handleMouseUp} onMouseUp={handleMouseUp}>
              <img className='fingerScannerImage' draggable="false" src="https://www.prankscanners.com/assets/images/print_clear.png" alt="" />
            { pressed && <img className='blurPrint' src="https://www.prankscanners.com/assets/images/print_blur.png" alt="blur-print" />
}
              {/* <div className={` ${!scannerPressed ? "scanningLine" : ""}`} ></div> */}
              {pressed &&   <div className={'scanningLine'} ></div>} 
   
</div>

          </div>
        </div>
      </div>
      <div className="copyright">
        <p  className='copyrightTxt'>Made with ❤️<span className='myName'>Shiras VM</span> </p>
      </div>
    </>
  );

  }
export default App;
