import OptionButton from "@/app/components/optionButton/optionButton";
import PopupFrame, {
  PopupClosebutton,
} from "@/app/components/popUpTools/popupTools";
import { useState } from "react";
import ChatBotbuildpoupTemplates from "./popuptemplates/buildChatbot";
import { defaultValueOfBox } from "../box/boxdataType";
enum TypeofPopup {
  BUILD_CHATBOT,
}
interface OptionSelectorProps{
  onCreateSctipts:any
  openItem:boolean
  onCreateItem:any
  itemName:string
}
export default function OptionSelector(props:OptionSelectorProps) {
  const [typeofPopup, setTypeofpopup] = useState(null);
  function close() {
    setTypeofpopup(null);
  }
  return (
    <div className="w-full relative my-2 ">
      <PopupFrame active={typeofPopup != null} blurColor="rgba(255,255,255,.6)">
        <div className="w-[1600px] relative rounded-md p-2 h-[900px] bg-black">
          <PopupClosebutton
            closeIconColor="white"
            onClose={() => {
              close();
            }}
          />
          {typeofPopup == TypeofPopup.BUILD_CHATBOT ? (
            <ChatBotbuildpoupTemplates  onClose={()=>{
              close() 
            }} itemName={props.itemName}/>
          ) : null}
        </div>
      </PopupFrame>
      {props.openItem?<div className=" text-opacity-50 text-black text-xs my-2">Option</div>:null}
      <div className={`w-full relative flex my-2 ${props.openItem?"justify-between":"justify-end"}`}>
        {props.openItem?<OptionButton
          name="create new scripts"
          onClick={() => {
            if (props.onCreateSctipts) {
              const intence =  defaultValueOfBox()
              props.onCreateSctipts(intence)
            }
          }}
        />:null}
        {!props.openItem?<OptionButton
          name="Create-Item"
          onClick={() => {
            if (props.onCreateItem) {
              props.onCreateItem()
            }
          }}
        />:null}
       {props.openItem? <OptionButton
          name="Build Chatbot"
          onClick={() => {
            setTypeofpopup(TypeofPopup.BUILD_CHATBOT);
          }}
        />:null}
      </div>
    </div>
  );
}
