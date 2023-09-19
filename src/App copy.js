import { useEffect, useState } from 'react';
import './App.css';

function App() {
  var startingTime
  var endingTime
  var difference
  const [pressed,setPressed]=useState(false)
  const [completed,setCompleted]=useState(false)
  const [incomplete,setIncomplete]=useState(false)
  let timeout
  function handleMouseDown(){
    
    setPressed(true)

  }
  function handleMouseUp(){
    setPressed(false)

    difference=startingTime-endingTime
    console.log("difference",difference);
    if(difference<3000){
      setIncomplete(true)
    }
  }
  useEffect( ()=> {
    if(pressed){
      startingTime=new Date()
      setCompleted(false)
      setIncomplete(false)
       timeout = setTimeout(function () {
        setPressed(false)
        console.log('Hello from setTimeout')
        setCompleted(true)

    }, 3000)
    
    }
    
    return ()=>  {
      endingTime=new Date()
      console.log("timeout cleared");
        clearTimeout(timeout)
         
    }
}, [pressed])
  
  return (
    <>

      <div className="container" >

        <div className="detectorContainer" draggable="false"> 
          <div className="topFrame">
            <div className="lieCircleContainer">
              <div className="lieCircleInnerContainer">
              </div>
            </div>
            <div className="line"></div>
            <div className="truthCircleContainer">
              <div className="truthCircleInnerContainer">
              </div>
            </div>

          </div>
          <div className="ResultContainer">
            <div className="ResultInnerContainer">
            {completed &&  <p className='resultTxt' >It's totally a lie!</p>}
            {(pressed && !completed ) &&  <p className='resultTxt' >Scanning!</p>}
            {incomplete  &&  <p className='resultTxt' >Scanning incomplete!</p>}
            </div>
          </div>
          <div className="fingerScannerContainer">
            <div className="fingerScannerInnerContainer" onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
              <img className='fingerScannerImage' draggable="false" src="https://www.prankscanners.com/assets/images/print_clear.png" alt="" />
              <img className='blurPrint' src="https://www.prankscanners.com/assets/images/print_blur.png" alt="blur-print" />

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
