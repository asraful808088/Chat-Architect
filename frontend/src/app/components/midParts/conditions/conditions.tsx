import GlobleData from "@/app/context/data/globle";
import ConditionIcon from "@/assets/svg/condition.svg";
import { useContext, useEffect, useState } from "react";
import BodyHeader from "../../bodyHeader/header";
import PythonCodingPad from "../../codePad/pad";
import ConditionCreateBox from "../../conditionCreateDialog/dailog";
import PopupFrame from "../../popUpTools/popupTools";
import DisplayItems from "../scripts/displayScripts/display";
export default function Conditions() {
  const globleIntence = useContext(GlobleData);
  const [popupDisplay, setPopupDisplay] = useState(false);
  const [items, setItems] = useState([]);
  const [codeDetails, setCodeDetails] = useState(null);
  useEffect(() => {
    if (globleIntence.socket) {
      globleIntence.socket?.on("passCondition", (obj) => {
        setItems(obj?.items ?? []);
      });
      globleIntence.socket?.on("code", (obj) => {
        setCodeDetails(obj ?? null);
      });

      globleIntence.socket?.emit("condition", { type: "get" });
    }
  }, [globleIntence.socket]);
  return (
    <div className="h-full w-full relative "
    
    style={{
      height:"calc(100vh - 120px)"
    }}
    >
      <PopupFrame active={popupDisplay}>
        <ConditionCreateBox
          onClose={() => setPopupDisplay(false)}
          onCreate={(value) => {
            if (globleIntence.socket) {
              // passCondition
              globleIntence.socket?.emit("condition", {
                type: "createCondition",
                ...value,
              });
            }
          }}
        />
      </PopupFrame>
      <BodyHeader name="Condition" />
      <div className="flex my-4 justify-end ">
        <div
          className="px-4 py-2 flex rounded-md border border-black justify-center items-center font-extrabold text-black text-xs cursor-pointer hover:scale-[1.02] transition-all"
          onClick={() => setPopupDisplay(true)}
        >
         {!codeDetails?"Create Conditions":"Run"}
        </div>
      </div>
      {!codeDetails ? (
        <DisplayItems
          Icon={ConditionIcon}
          items={items}
          onOpen={(name) => {
            globleIntence.socket?.emit("condition", {
              type: "openCode",
              name: name,
            });
          }}
          onDelete={(value) => {
            if (globleIntence.socket) {
              globleIntence.socket?.emit("condition", {
                type: "delete",
                ...value,
              });
            }
          }}
        />
      ) : (
        <PythonCodingPad code={codeDetails?.code} onChangeCode={(value)=>{
            globleIntence.socket?.emit("condition", { type: "update",code:value,name:codeDetails.name });
        }}/>
      )}


      
    </div>
  );
}
