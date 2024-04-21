import { useEffect, useState } from "react";
import Miter from "../../miter/miter";
import { PopupClosebutton } from "../../popUpTools/popupTools";
import MiniGraph from "./miniLineGraph/graph";
import { useSelector } from "react-redux";
interface ReportTemplateProps {
  onClose: any;
}
export default function ReportTemplate(props: ReportTemplateProps) {
    const [rate,setRate] = useState(0)
    
    useEffect(()=>{
       const trackTimeist =  setInterval(()=>{
            setRate(prev=>prev+1)
        },100)
        return ()=>clearInterval(trackTimeist)
    },[])
  return (
    <div className="w-[1200px] h-[900px] bg-black rounded-md overflow-y-auto p-2">
      <PopupClosebutton
        closeIconColor="white"
        onClose={() => {
          if (props.onClose) {
            props.onClose();
          }
        }}
      />
       <EpMitter />
      <hr className="m-auto w-[80%]" />
     
      <TraningScoreMitter />




      <hr className="m-auto w-[80%]" />
      <ValScoreMitter />
      <hr className="m-auto w-[80%]" />






      <TraningGraphView />








      <hr className="m-auto w-[80%]" />




      <ValGraphView />








      <hr className="m-auto w-[80%]" />



      <FittingMonitor />


{/* 
      <hr className="m-auto w-[80%]" />
      <div className="w-full relative text-lg text-white text-center my-2">
        Compare - Latest With Others
      </div>
      <div className="w-[900px] m-auto relative flex justify-around h-[400px] bg-slate-700 my-2 ">

      </div>

      <hr className="m-auto w-[80%]" />
      <div className="w-full relative text-lg text-white text-center my-2">
        Time Series - Report State
      </div>
      <div className="w-[900px] m-auto relative flex justify-around h-[400px] bg-slate-700 my-2 items-center"></div>
      <hr className="m-auto w-[80%]" />
      <div className="w-full relative text-lg text-white text-center my-2">
        Graph Visualization - Time Series
      </div>
      <div className="w-[900px] m-auto relative flex justify-around h-[400px] my-2 items-center">
      <MiniGraph width={"w-full"}/>
      </div> */}
    </div>
  );
}










function FittingMonitor(){
  const ep = useSelector(data=>data)
  const [traning_loss,setLoss] = useState([])
  const [val_loss,setValLoss] = useState([])
  useEffect(()=>{
    if (ep.buildReducer.stapInfo.stap_3.info[0]) {
      let graphLossData = []
      let valLoss = []
      let count = ep.buildReducer.stapInfo.stap_3.info.length
      for (const iterator of ep.buildReducer.stapInfo.stap_3.info) {
        graphLossData = [{x:count,y:iterator.loss},...graphLossData]
        valLoss = [{x:count,y:iterator.val_loss},...valLoss]
        count-=1
      }
      
      setLoss(graphLossData)
      setValLoss(valLoss)
    }
  },[ep.buildReducer.stapInfo.stap_3.info])
  return <>
  
  <div className="w-full relative text-lg text-white text-center my-2">
        Fiting - Report
      </div>
      <div className="w-[900px] m-auto relative flex justify-around h-[400px] my-2 items-center">
      <MiniGraph width={"w-full"} data_1={traning_loss} data_2={val_loss}/>


      </div>



  
  </>
}













function TraningGraphView(){

  const ep = useSelector(data=>data)
  const [loss,setLoss] = useState([])
  const [accuracy,setAccuracy] = useState([])
  useEffect(()=>{
    
    if (ep.buildReducer.stapInfo.stap_3.info[0]) {
      let graphLossData = []
      let graphAuqData = []
      let count = ep.buildReducer.stapInfo.stap_3.info.length
      for (const iterator of ep.buildReducer.stapInfo.stap_3.info) {
        graphLossData = [{x:count,y:iterator.loss},...graphLossData]
        graphAuqData = [{x:count,y:iterator.accuracy},...graphAuqData]
        count-=1
      }
      
      setLoss(graphLossData)
      setAccuracy(graphAuqData)
    }
  },[ep.buildReducer.stapInfo.stap_3.info])
  return <>
  
  
  <div className="w-full relative text-lg text-white text-center my-2">
        Graph - Visualization Traning-Score
      </div>

      <div className="w-full relative flex justify-around items-center ">
       
        <MiniGraph data_1={loss}/>
        <MiniGraph data_1={accuracy}/>
       
      </div>

  
  </>
}
















function ValGraphView(){

  const ep = useSelector(data=>data)
  const [loss,setLoss] = useState([])
  const [accuracy,setAccuracy] = useState([])
  useEffect(()=>{
    
    if (ep.buildReducer.stapInfo.stap_3.info[0]) {
      let graphLossData = []
      let graphAuqData = []
      let count = ep.buildReducer.stapInfo.stap_3.info.length
      for (const iterator of ep.buildReducer.stapInfo.stap_3.info) {
        graphLossData = [{x:count,y:iterator.val_loss},...graphLossData]
        graphAuqData = [{x:count,y:iterator.val_accuracy},...graphAuqData]
        count-=1
      }
      
      setLoss(graphLossData)
      setAccuracy(graphAuqData)
    }
  },[ep.buildReducer.stapInfo.stap_3.info])
  return <>
  
  
  <div className="w-full relative text-lg text-white text-center my-2">
  Graph - Visualization Validation-Score
      </div>

      <div className="w-full relative flex justify-around items-center ">
       
        <MiniGraph data_1={loss}/>
        <MiniGraph data_1={accuracy}/>
       
      </div>

  
  </>
}












































function TraningScoreMitter(){
  const ep = useSelector(data=>data)
  const [loss,setLoss] = useState(0)
  const [accuracy,setAccuracy] = useState(0)
  useEffect(()=>{
    
    if (ep.buildReducer.stapInfo.stap_3.info[0]) {
      const newLoss = ep.buildReducer.stapInfo.stap_3.info[0].loss * 100
      const newAccuracy = ep.buildReducer.stapInfo.stap_3.info[0].accuracy * 100
      setLoss(newLoss)
      setAccuracy(newAccuracy)
    }
  },[ep.buildReducer.stapInfo.stap_3.info])

  return <>
   <div className="w-full relative text-lg text-white text-center my-2">
        Traning-Score
      </div>
      <div className="w-full relative flex justify-around">
        <div className="">
          <div className="h-[300px] w-[300px]  m-auto relative flex justify-center items-center">
          <Miter rate={loss} />

          </div>
          <div className="text-sm w-full text-center my-2">Loss - {loss}</div>
        </div>
        <div className="">
          <div className="h-[300px] w-[300px] m-auto relative flex justify-center items-center">
          <Miter rate={accuracy} />

          </div>
          <div className="text-sm w-full text-center my-2">Accuracy - {accuracy}</div>
        </div>
      </div>
  
  
  </>
}













function ValScoreMitter(){
  const ep = useSelector(data=>data)
  const [loss,setLoss] = useState(0)
  const [accuracy,setAccuracy] = useState(0)
  useEffect(()=>{
    
    if (ep.buildReducer.stapInfo.stap_3.info[0]) {
      const newLoss = ep.buildReducer.stapInfo.stap_3.info[0].val_loss * 100
      const newAccuracy = ep.buildReducer.stapInfo.stap_3.info[0].val_accuracy * 100
      setLoss(newLoss)
      setAccuracy(newAccuracy)
    }
  },[ep.buildReducer.stapInfo.stap_3.info])








  return <>
   <div className="w-full relative text-lg text-white text-center my-2">
   Validation-Score
      </div>
      <div className="w-full relative flex justify-around">
        <div className="">
          <div className="h-[300px] w-[300px]  m-auto relative flex justify-center items-center">
          <Miter rate={loss} />

          </div>
          <div className="text-sm w-full text-center my-2">Loss - {loss}</div>
        </div>
        <div className="">
          <div className="h-[300px] w-[300px] m-auto relative flex justify-center items-center">
          <Miter rate={accuracy} />

          </div>
          <div className="text-sm w-full text-center my-2">Accuracy - {accuracy}</div>
        </div>
      </div>
  
  
  </>
}


























function EpMitter(){
  const ep = useSelector(data=>data)
  const [rate,setRate] = useState(0)
  useEffect(()=>{
    const result  = ((ep.buildReducer.stapInfo.stap_3.info[0]?.epoch??0/ep.buildReducer.stapInfo.stap_3.totalEp??0)*100)
    if (result) {
      let processRate = (ep.buildReducer.stapInfo.stap_3.info[0]?.epoch/ep.buildReducer.stapInfo.stap_3.totalEp)*100
      processRate+=1
        if (processRate>100) {
          processRate = 100
        }

      setRate(processRate)
    }
  },[ep.buildReducer.stapInfo.stap_3.info])

  return <>
  <div className="w-full relative text-lg text-white text-center my-2"> 
        Epoch
      </div>
      <div className="w-full relative">
        <div className="h-[300px] w-[300px] m-auto relative flex justify-center items-center">



          
          <Miter rate={rate} />
        </div>
        <div className="text-sm w-full text-center my-2">Epoch - {ep.buildReducer.stapInfo.stap_3.totalEp}/{ep.buildReducer.stapInfo.stap_3.info[0]?.epoch??0}</div>
      </div>
  
  </>
}

