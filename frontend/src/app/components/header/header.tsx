"use client";
import GlobleData from "@/app/context/data/globle";
import BotIcon from "@/assets/logo/bot/debug.png";
import Logo from "@/assets/logo/logo.png";
import DeleteIcon from "@/assets/svg/delete.svg";
import ReportIcon from "@/assets/svg/report.svg";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import PermissionPopup from "../permissionDialog/dialog";
import PopupFrame, { PopupClosebutton } from "../popUpTools/popupTools";
import TextBiEffect from "../textEffect/biEffect/biEffect";
import ReportTemplate from "./report/report";
import { useDispatch, useSelector } from "react-redux";
import { changeBotName ,changeListOfBot} from "@/app/redux/action/bot";
export default function Header() {
  const [showpopup, setpopUp] = useState(false);
  const [showOptions, setShowoption] = useState(false);
  const [createBotPopup, setCreateBotPopup] = useState(false);
  const [createBotName, setCreateBotName] = useState("");
  const [deletePopup,setDeletepopup] = useState(false)
  const [storeDeleteItemName,setBotItemname] = useState("")
  const [botRunloading,setBotRunloading] = useState(false)
  const botName = useSelector(state=>state.botReducer.activeBot)
  const listOFBots = useSelector(state=>state.botReducer.listOfBot)
  const traningRunning = useSelector(state=>state.buildReducer.stapInfo.buildRunning)
  const mainIntence = useContext(GlobleData);
  const dispatcher  = useDispatch()
  useEffect(() => {
    if (mainIntence.socket) {
      mainIntence.socket.on("botStop", (data) => {
        setBotRunloading(false)
        dispatcher(changeBotName())
      });
       mainIntence.socket.on("botStartFailed", (data) => {
        setBotRunloading(false)
      });
      mainIntence.socket.on("startChatBot", (data) => {
        dispatcher(changeBotName(data.name))
        setBotRunloading(false)
      });
      mainIntence.socket.on("collectBots", (data) => {
       
        dispatcher(changeListOfBot(data.items))
      });
      mainIntence.socket.emit("botOptions", {
        type: "get",
      });
    }
  }, [mainIntence.socket]);
  return (
    <div className="w-full relative flex items-center justify-between">
      
      <PopupFrame active={deletePopup}>
        <PermissionPopup onNo={()=>{
          setDeletepopup(false)
        }} onYes={()=>{
          setDeletepopup(false)
          mainIntence.socket.emit("botOptions", {
            type: "delete",
            name: storeDeleteItemName,
          });
        }} onClose={()=>{
          setDeletepopup(false)
        }}/>
      </PopupFrame>
      <PopupFrame active={createBotPopup}>
        <div className="w-[900px] h-[450px] bg-white relative rounded-md shadow-2xl p-2">
          <PopupClosebutton
            closeIconColor="black"
            onClose={() => {
              setCreateBotPopup(false);
            }}
          />
          <div className="flex justify-center items-center">
            <div className="w-40 relative">
              <Image src={BotIcon} alt="" />
            </div>
            <div className=" text-black font-extrabold text-2xl">
              Create Chatbot
            </div>
          </div>
          <div className="w-[400px] relative m-auto my-5">
            <input
              type="text"
              name=""
              id=""
              value={createBotName}
              className="h-full w-full relative border-b border-black outline-none text-black font-extrabold"
              placeholder="create chatbot"
              onChange={(e) => {
                setCreateBotName(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key == "Enter") {
                  const findBot = listOFBots.find(
                    (element) => element == createBotName
                  );
                  if (!findBot) {
                    setCreateBotName("");
                    mainIntence.socket.emit("botOptions", {
                      type: "create",
                      name: createBotName,
                    });
                    
                  }
                }
              }}
            />
          </div>
        </div>
      </PopupFrame>
      <PopupFrame active={showpopup} blurColor="rgba(255,255,255,.5)">
        <ReportTemplate
          onClose={() => {
            setpopUp(false);
          }}
        />
      </PopupFrame>
      <div className="w-28 relative flex flex-col items-center">
        <Image src={Logo} alt="" />
        <div className="font-extrabold text-black whitespace-nowrap">
          <TextBiEffect text="Chat Architect" />
        </div>
      </div>
      <div className="flex items-center">
        <div
          className="h-8 w-8 relative mx-2 cursor-pointer"
          onClick={() => {
            setpopUp(true);
          }}
        >
          <div className="h-3 w-3 rounded-full  bg-black border-gray-300 absolute border-2 right-0 top-0 cursor-pointer"></div>
          <ReportIcon fill="black" />
        </div>
        <div className="w-[240px] mx-2 h-11 bg-gray-400 cursor-pointer rounded-md shadow-2xl relative">
          <div
            className="h-full w-full relative flex justify-center items-center"
            onClick={() => {
              if (!traningRunning) {
                if (!botRunloading) {
                  setShowoption(!showOptions);
                }
              }
             
            }}
          >
            {botRunloading?<div className="h-10 w-10 relative flex justify-center items-center p-2">
              <div className="h-7 w-7 border-x-2 rounded-full animate-spin absolute">

              </div>
              <div className="h-7 w-7 border-y-2 rounded-full animate-spin absolute" style={{
                transform:"rotateX(180deg)"
              }}>

              </div>
            </div>:botName ?? "Select You AI"}
          </div>
          {showOptions ? (
            <div className="w-full  absolute my-5 px-2 bg-gray-400 top-[100%] z-50 rounded-md">
              {listOFBots.map((element, index) => {
                if (element == botName) {
                  return;
                }
                return (
                  <SelectableOption
                    key={index}
                    name={element}
                    onDelete={(name) => {
                      setBotItemname(name)
                      setDeletepopup(true)
                    }}
                    onClick={(name) => {
                      setBotRunloading(true)
                      setShowoption(false);
                      mainIntence.socket.emit("botOptions", {
                        type: "start",
                        name: name,
                        activeBot:botName
                      });
                    }}
                  />
                );
              })}
              {botName ? (
                <SelectableOption
                  name="Close Chatbot"
                  hideDelete={true}
                  onClick={(name) => {
                    setShowoption(false);
                    setBotRunloading(true)
                    mainIntence.socket.emit("botOptions", {
                      type: "stop",
                      name: botName,
                    });
                  }}
                />
              ) : null}
              <SelectableOption
                hideDelete={true}
                onClick={(name) => {
                  setShowoption(false);
                  setCreateBotPopup(true);
                }}
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

interface SelectableOptionProps {
  onClick: any;
  name: string;
  hideDelete: boolean;
  onDelete: any;
}
function SelectableOption(props: SelectableOptionProps) {
  return (
    <div className="w-full flex items-center">
      <div
        className="w-full text-sm  text-white h-9 my-2 flex-grow   flex items-center justify-center cursor-pointer"
        onClick={() => {
          if (props.onClick) {
            props.onClick(props.name);
            
          }
        }}
      >
        {props.name ?? "Create Chat-Bot"}
      </div>
      {!props.hideDelete ? (
        <div
          className="h-8 w-8 relative p-[6px]"
          onClick={() => {
            if (props.onDelete) {
              props.onDelete(props.name);
            }
          }}
        >
          <DeleteIcon fill="white" />
        </div>
      ) : null}
    </div>
  );
}
