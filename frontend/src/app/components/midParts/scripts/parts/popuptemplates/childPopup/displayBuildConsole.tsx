import { PopupClosebutton } from "@/app/components/popUpTools/popupTools";
import { change_2_hideOptions } from "@/app/redux/action/checkInfo";
import ActionIcon from "@/assets/svg/action.svg";
import FunctionIcon from "@/assets/svg/activation.svg";
import FailedIcon from "@/assets/svg/failed.svg";
import IntentIcon from "@/assets/svg/intent.svg";
import LoadingIcon from "@/assets/svg/loading.svg";
import ResIcon from "@/assets/svg/response.svg";
import SuccessIcon from "@/assets/svg/success.svg";
import WarningIcon from "@/assets/svg/warning.svg";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
interface BuildConsoleProps {
  onClose: any;
  onBuild: any;
  totalEp:number
}
export default function BuildConsole(props: BuildConsoleProps) {
  const selector = useSelector((select) => select.buildReducer);
  const dispatcher = useDispatch();
  return (
    <div className="w-[1600px] h-[900px] relative bg-black rounded-md shadow-xl px-2 py-2">
      <PopupClosebutton
        closeIconColor="white"
        onClose={() => {
          if (props.onClose) {
            props.onClose();
          }
        }}
      />
      <div className="w-full  h-[93%] flex items-center justify-between px-2">
        <div className="w-[600px] h-full ">
          <div className="w-full relative text-white my-2 ">Staps</div>
          <HeaderWithClicle
            no={1}
            successMode={selector.stapInfo.stap_1.stage == "S"}
            failedMode={selector.stapInfo.stap_1.stage == "F"}
            warningMode={selector.stapInfo.stap_1.stage == "W"}
            loadingMode={selector.stapInfo.stap_1.stage == "N"}
            header="layer chacking"
          />
          {selector.stapInfo.stap_1.stage == "F" ||
          selector.stapInfo.stap_1.stage == "W" ? (
            <div className="w-full relative my-6">
              <div className="text-white text-sm text-center">Missing</div>
              <div className="text-xs text-center">
                {`"Intent and Response"`} is mandatory part of script model..so
                you must use it
              </div>
              <div className="w-full flex justify-center my-5">
                <div
                  className="text-xs relative mx-2 p-2 border border-white px-6 rounded-md cursor-pointer"
                  onClick={() => {
                    if (props.onClose) {
                      props.onClose(true);
                    }
                  }}
                >
                  fix
                </div>
              </div>
            </div>
          ) : null}
          <HeaderWithClicle
            no={2}
            successMode={selector.stapInfo.stap_2.stage == "S"}
            failedMode={selector.stapInfo.stap_2.stage == "F"}
            warningMode={selector.stapInfo.stap_2.stage == "W"}
            loadingMode={selector.stapInfo.stap_2.stage == "N"}
            header="intence files chacking"
          />
          {Object.keys(selector.stapInfo.stap_2.errors) != 0 ? (
            <div className="w-full relative my-6">
              <div className="text-white text-sm text-center">
                Not Found Intences
              </div>
              <div className="text-xs text-center my-4">
                {Object.keys(selector.stapInfo.stap_2.errors).map(
                  (element, index) => {
                    if (selector.stapInfo.stap_2.errors[element].length != 0) {
                      return (
                        <div key={index} className="text-xs my-4">
                          {element} not found (
                          {selector.stapInfo.stap_2.errors[element].map(
                            (element, index) => {
                              return (
                                <span key={index} className="text-red-600 mx-2">
                                  {element}
                                </span>
                              );
                            }
                          )}
                          )
                        </div>
                      );
                    }
                  }
                )}
              </div>
            </div>
          ) : !selector.stapInfo.stap_2.hideBuildOption ? (
            <div className="w-full relative my-5">
              <div className="relative text-sm text-center">
                Select Build Option
              </div>
              <div className="w-full relative flex justify-center items-center my-3">
                <div
                  className="border border-white p-2  mx-2 rounded-md text-xs  cursor-pointer hover:scale-[1.02] transition-all"
                  onClick={() => {
                    if (props.onBuild) {
                      props.onBuild(true);
                      dispatcher(change_2_hideOptions(true));
                    }
                  }}
                >
                  Build with server
                </div>
                <div
                  className="border border-white p-2 mx-2 rounded-md text-xs  cursor-pointer hover:scale-[1.02] transition-all"
                  onClick={() => {
                    if (props.onBuild) {
                      props.onBuild(false);
                      dispatcher(change_2_hideOptions(true));
                    }
                  }}
                >
                  Build only model
                </div>
              </div>
            </div>
          ) : null}

          <HeaderWithClicle
            no={3}
            successMode={selector.stapInfo.stap_3.stage == "S"}
            failedMode={selector.stapInfo.stap_3.stage == "F"}
            warningMode={selector.stapInfo.stap_3.stage == "W"}
            loadingMode={selector.stapInfo.stap_3.stage == "N"}
            header="model building"
          />
          {selector.stapInfo.stap_3.errors.length != 0 ? (
            <>
              {selector.stapInfo.stap_3.errors.map((element, index) => {
                if (element.type == "less_intent") {
                  return (
                    <div
                      key={index}
                      className="w-full relative my-10 text-center"
                    >
                      <div className="text-sm relative">
                        Minimum condition failed of Intent
                      </div>
                      <div className="text-xs  text-center my-2">
                        Minimum Intent quantity 100 (total)
                      </div>
                    </div>
                  );
                }
                if (element.type == "empty_intent") {
                  return (
                    <div
                      key={index}
                      className="w-full relative my-10 text-center"
                    >
                      <div className="text-sm relative">Intent Missing</div>
                      <div className="text-xs  text-center my-2">
                        not found intent (
                        {element.items.map((text, index) => (
                          <span className="mx-2 text-red-600" key={index}>
                            {text}
                          </span>
                        ))}
                        )
                      </div>
                    </div>
                  );
                }
                if (element.type == "empty_layers") {
                  return (
                    <div
                      key={index}
                      className="w-full relative my-5 text-center"
                    >
                      <div className="text-sm relative">
                        Hidden Layer Missing
                      </div>
                      <div className="text-xs  text-center my-2">
                        You must use at least 1 hidden layer
                      </div>
                    </div>
                  );
                }
              })}
            </>
          ) : selector.stapInfo.buildRunning?<Progressbar totalEpochs={props.totalEp} fillEpochs={selector?.stapInfo?.stap_3?.info[0]?.epoch+1}/>:null}
            {selector.stapInfo.buildRunning?<div className="w-full relative my-5 flex justify-center">
                <div className="px-3 py-2 relative border-white rounded-md border text-xs w-fit cursor-pointer hover:scale-[1.02] transition-all" onClick={()=>{
                  if (props.onClose) {
                    props.onClose("closeBuild")
                  }
                }}>
                  Cancle Traning
                </div>
            </div>:null}














        </div>




        <div className="w-[700px] h-full bg-white rounded-md p-2 overflow-y-auto">
          <div className="w-full relative text-black">Console-Information</div>


            



















          {Object.keys(selector.stapInfo.stap_1.uniqueItems) != 0 ? (
            <div className="w-full relative text-black text-xs my-2 ">
              unique-items (stap-1)
            </div>
          ) : null}
          <div className="w-full relative  ">
            {Object.keys(selector.stapInfo.stap_1.uniqueItems) != 0 ? (
              <UniqueItems
                listOfIntent={selector.stapInfo.stap_1.uniqueItems.intent}
                listOfFunc={selector.stapInfo.stap_1.uniqueItems.prefixfunc}
                listOfResponse={selector.stapInfo.stap_1.uniqueItems.response}
              />
            ) : null}
          </div>

          {selector.stapInfo.stap_1.info.length != 0 ? (
            <div className="w-full relative text-black text-xs my-2 ">
              layers-intence (stap-1)
            </div>
          ) : null}
          {selector.stapInfo.stap_1.info?.map((element, index) => {
            return (
              <div key={index} className="w-full">
                <div className="w-full relative h-[370px] overflow-y-auto">
                  <InfoDetails
                    id={element.id}
                    intentName={element.intent}
                    index={element.index}
                    responseList={element.response}
                    functionName={element.prefixfunc}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

interface InfoDetailsProps {
  intentName: string;
  functionName: string;
  responseList: Array;
  index: number;
  id: string;
}
function InfoDetails(props: InfoDetailsProps) {
  return (
    <div className="w-full relative my-4">
      <div className="w-full relative my-2 text-black text-xs">
        layer : {props.index + 1} ({props.id})
      </div>
      <div className="ml-1">
        <div className="w-[1px] h-7 ml-[9px] bg-black"></div>
        <div className="w-full relative flex items-center">
          <div className="w-5 h-5 relative">
            <IntentIcon fill="black" />
          </div>
          <div className="w-5 h-[1px] bg-black"></div>
          <div
            className={`${
              !props.intentName ? "text-red-700" : "text-black"
            } mx-1 relative text-xs `}
          >
            {props.intentName ?? "empty-intent (mandatory)"}
          </div>
        </div>
      </div>
      <div className="ml-1">
        <div className="w-[1px] h-7 ml-[9px] bg-black"></div>
        <div className="w-full relative flex items-center">
          <div className="w-5 h-5 relative">
            <FunctionIcon fill="black" />
          </div>
          <div className="w-5 h-[1px] bg-black"></div>
          <div className="text-black mx-1 relative text-xs">
            {props.functionName ?? "no-function (optional)"}
          </div>
        </div>
      </div>
      <div className="ml-1">
        <div className="w-[1px] h-7 ml-[9px] bg-black"></div>

        <div className="w-full relative flex items-center">
          <div className="w-5 h-5 relative">
            <ResIcon fill="black" />
          </div>
          <div className="w-5 h-[1px] bg-black"></div>
          <div
            className={`${
              !props.responseList?.length != 0 ? "text-red-700" : "text-black"
            } mx-1 relative text-xs`}
          >
            {props.responseList?.length != 0
              ? `response-quantity- ${props.responseList?.length}`
              : "empty-Response (mandatory)"}
          </div>
        </div>

        {props.responseList?.map((element, index) => {
          return (
            <div className="ml-[40px]" key={index}>
              <div className="w-[1px]  ml-[8px] h-7  bg-black"></div>
              <div className="w-full relative flex items-center">
                <div className="w-5 h-5 relative">
                  {!element.includes(".action") ? (
                    <ResIcon fill="black" />
                  ) : (
                    <ActionIcon fill="black" />
                  )}
                </div>
                <div className="w-5 h-[1px] bg-black"></div>
                <div className={`text-black mx-1 relative text-xs`}>
                  {element}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface HeaderWithClicleProps {
  no: number;
  header: string;
  loadingMode: string;
  successMode: boolean;
  failedMode: boolean;
  warningMode: boolean;
}
function HeaderWithClicle(props: HeaderWithClicleProps) {
  return (
    <div
      className={`w-full relative mt-10 flex items-center ${
        props.failedMode ||
        props.loadingMode ||
        props.successMode ||
        props.warningMode
          ? "opacity-1"
          : "opacity-50"
      }`}
    >
      <div className="h-6 w-6 rounded-full border-white border-2 flex justify-center items-center text-xs">
        {!(props.failedMode || props.successMode || props.warningMode) &&
        !props.loadingMode
          ? props.no
          : null}
        {!(props.failedMode || props.successMode || props.warningMode) &&
        props.loadingMode ? (
          <div className="h-full w-full relative p-1 animate-spin">
            <div
              className="h-full w-full"
              style={{
                transform: "rotatex(180deg)",
              }}
            >
              <LoadingIcon fill="white" />
            </div>
          </div>
        ) : null}
        {props.failedMode || props.successMode || props.warningMode ? (
          <div
            className={`h-full w-full relative ${
              props.successMode
                ? "p-[3px]"
                : props.failedMode
                ? "p-[2px]"
                : "p-[3px]"
            }`}
          >
            {props.successMode ? (
              <SuccessIcon fill="white" />
            ) : props.failedMode ? (
              <FailedIcon fill="white" />
            ) : (
              <WarningIcon fill="white" />
            )}
          </div>
        ) : null}
      </div>
      <div className=" text-xs ml-2">{props.header ?? "header"}</div>
    </div>
  );
}

interface UniqueItemsProps {
  listOfIntent: Array;
  listOfFunc: Array;
  listOfResponse: Array;
}
function UniqueItems(props: UniqueItemsProps) {
  return (
    <div className="w-full relative">
      <ItemIconWithHeaderWith
        listOfItems={props.listOfIntent}
        ICON={IntentIcon}
        title="Intents"
      />
      <ItemIconWithHeaderWith
        listOfItems={props.listOfResponse}
        ICON={ResIcon}
        title="Responses"
      />
      <ItemIconWithHeaderWith
        listOfItems={props.listOfFunc}
        ICON={FunctionIcon}
        title="Conditions"
      />
    </div>
  );
}

interface ItemIconWithHeaderWithProps {
  ICON: any;
  title: string;
  listOfItems: Array;
}
function ItemIconWithHeaderWith(props: ItemIconWithHeaderWithProps) {
  return (
    <div className=" relative  ml-[9px] text-xs text-black my-3">
      <div className=" relative flex items-center">
        <div className="w-5 h-5 relative">
          <props.ICON fill="black" />
        </div>
        <div className="ml-2">{props.title ?? "title"}</div>
      </div>
      {props.listOfItems?.map((element, index) => {
        return (
          <div
            key={index}
            className="flex flex-col items-center w-fit relative ml-10"
          >
            <div className="w-[1px] h-7 bg-black relative "></div>
            <div className="h-5  w-5  flex items-center">
              <div className="min-h-5 min-w-5 relative border-black border rounded-full text-[9px] flex justify-center items-center ">
                {index > 100 ? "99+" : index + 1}
              </div>
              <div className="min-h-[1px] min-w-7 bg-black relative "></div>
              <div className="text-black text-xs relative">{element}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

interface ProgressbarProps{
  totalEpochs:number
  fillEpochs:number
}
function Progressbar(props:ProgressbarProps){
  const [processCount,setProcessCount] = useState(0)
  useEffect(()=>{
    setProcessCount(props.fillEpochs??0)
  },[props.fillEpochs])
    return  <div className="w-full relative my-5">
    <div className="text-sm relative text-center">Model Traning</div>
    <div className="my-5 relative text-center text-xs">Epochs {props.totalEpochs}/{processCount}</div>
    
    <div className="my-5">
      <div className="w-[450px] h-5 bg-gray-500 rounded-2xl mx-auto overflow-hidden">
        <div className=" h-5 bg-white rounded-3xl transition-all" style={{
          width:`${(processCount/props.totalEpochs)*100}%`
        }}></div>
      </div>
    </div>
    <div className="my-5 relative text-center text-xs">progress {(processCount/props.totalEpochs)*100}%</div>

  </div>
}