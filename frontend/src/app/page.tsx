"use client";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Sidebar from "./components/aside/sideBar";
import Header from "./components/header/header";
import Menu from "./components/menu/menu";
import Midpart from "./components/midPart/midpart";
import GlobleData from "./context/data/globle";
import useSocket from "./hook/soket.io/soket";
import {
  buildRunningState,
  change_1_info,
  change_2_errors,
  change_3_errors,
  change_3_info,
  change_stap_1_stage,
  change_stap_1_uniqueItems,
  change_stap_2_stage,
  change_stap_3_stage,
  change_2_hideOptions
  
} from "./redux/action/checkInfo";
export enum MidPartType {
  INTENT,
  RESPONSE,
  CUSTOM_RESPONSE,
  ENTITIES,
  SCRIPTS,
  SYNONYMS,
  CONDITION,
}
export default function Home() {
  const [pageType, setPagetype] = useState<MidPartType>(MidPartType.INTENT);
  const { socket } = useSocket();
  const dispatchr = useDispatch();
  useEffect(() => {
    if (socket) {
      
      socket.on("checkInfoForBuilding", (data) => {
        if (data.type == "travleItemsShow") {
          dispatchr(change_1_info(data.items));
        } else if (data.type == "uniqueTravleItemsShow") {
          dispatchr(change_stap_1_uniqueItems(data.items));
          const findError = data.travleItems?.find(
            (element) => !element.intent
          );
          if (findError) {
            dispatchr(change_stap_1_stage("F"));
          } else if (
            data.travleItems?.find((element) => element.response.length == 0)
          ) {
            dispatchr(change_stap_1_stage("W"));
          } else {
            dispatchr(change_stap_1_stage("S"));
            dispatchr(change_stap_2_stage("N"));
            socket.emit("build", {
              type: "checkingFileIntence",
              items: data.items,
            });
          }
        } else if (data.type == "checkingFiles") {
        } else if (data.type == "finishCheck") {
          let success = true;
          for (const iterator of Object.keys(data.items)) {
            if (data.items[iterator].length != 0) {
              success = false;
              break;
            }
          }

          if (!success) {
            Object.keys(data.items).forEach((element) => {
              if (data.items[element].length != 0) {
                dispatchr(change_stap_2_stage("F"));
                dispatchr(change_2_errors(data.items));
              }
            });
          } else {
            dispatchr(change_stap_2_stage("S"));
          }
        } else if (data.type == "errors_Of_3_Stap") {
          dispatchr(change_stap_3_stage("F"));
          dispatchr(change_3_errors(data.errors));
        } else if (data.type == "readyToBuilding") {
          dispatchr(change_stap_3_stage("N"));
         
        } else if (data.type == "modelBuilding") {
          dispatchr(buildRunningState(true));
          dispatchr(change_3_info(data.value));
        }else if (data.type == "traningFinished") {
          dispatchr(buildRunningState(false));
          dispatchr(change_stap_3_stage("S"));
          dispatchr(change_3_info([]));
          dispatchr(buildRunningState(false));
          dispatchr(change_stap_1_uniqueItems({}));
          dispatchr(change_2_errors({}));
          dispatchr(change_2_hideOptions(null));
          dispatchr(change_3_errors([]));
          dispatchr(change_3_info([]));
          dispatchr(buildRunningState(false));
        }else if (data.type == "buildDestroy") {
          dispatchr(buildRunningState(false));
          dispatchr(change_stap_1_uniqueItems({}));
          dispatchr(change_2_errors({}));
          dispatchr(change_2_hideOptions(null));
          dispatchr(change_3_errors([]));
          dispatchr(change_3_info([]));
          dispatchr(change_stap_3_stage(""));
          dispatchr(buildRunningState(false));
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);
  return (
    <GlobleData.Provider value={{ socket }}>
      <div className="w-full relative flex flex-col h-screen">
        <div className="w-full">
          <Header />
        </div>
        <div className="w-full flex">
          <div className="">
            <Menu
              type={pageType}
              onChange={(value) => {
                setPagetype(value);
              }}
            />
          </div>
          <div className="flex-grow h-full z-[111]">
            <Midpart type={pageType} />
          </div>
          <div className="h-full">
            <Sidebar />
          </div>
        </div>
      </div>
    </GlobleData.Provider>
  );
}
