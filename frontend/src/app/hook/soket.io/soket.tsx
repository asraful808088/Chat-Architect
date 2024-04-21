import host from "@/app/config/host";
import { changeBotName } from "@/app/redux/action/bot";
import {
  change_1_info,
  change_stap_1_stage,
  change_stap_1_uniqueItems,
  change_stap_2_stage,
  stapInfo_changer_of_build
  ,buildRunningState,
  change_stap_3_stage,
  change_2_hideOptions
  
} from "@/app/redux/action/checkInfo";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import io from "socket.io-client";

export default function useSocket() {
  const [socket, setSocket] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    const createSoket = io(host.url);
    createSoket.on("init", (data) => {
      // console.log(data);
      
      dispatch(changeBotName(data.activeBot));
      if (data.buildRunning) {
        dispatch(change_stap_1_stage("S"))
        dispatch(change_stap_2_stage("S"))
        dispatch(change_stap_3_stage("N"))
        dispatch(change_1_info(data?.storeLayerData ?? []))
        dispatch(change_stap_1_uniqueItems(data?.storeBuildData ?? {}))
        dispatch(buildRunningState(data.buildRunning))
        dispatch(buildRunningState(data.buildRunning))
        dispatch(change_2_hideOptions(true))
        
        
        
     
       
        
      }
    });
    createSoket.on("connect_with_server", () => {
      setSocket(createSoket);
    });
  }, []);
  return { socket };
}
