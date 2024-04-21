import AddIcon from "@/assets/svg/add-square-svgrepo-com.svg";
import ImageIcon from "@/assets/svg/image-pen-svgrepo-com.svg";
import MoreIcon from "@/assets/svg/list-svgrepo-com.svg";
import { useEffect, useState } from "react";
import PopupFrame, { PopupClosebutton } from "../../popUpTools/popupTools";
import OptionsHandler from "../../midParts/intent/optionHandler/option";
import OptionSelector from "../../option/option";
interface MoreOptionsProps {
  onNewintence: any;
  initItems: Array;
  option:object
  defaultOptions:boolean
  onUpdateoptionStatus:any
}
export default function MoreOptions(props: MoreOptionsProps) {
  const [showPopup, setShowPopup] = useState(false);
  const [urls, setUrl] = useState([]);
  const [inputValue, setInputValue] = useState("");
  useEffect(() => {
    setUrl(props?.initItems ?? []);
  }, [props?.initItems]);
  return (
    <div
      className="w-[23px] h-[23px] relative p-[3px] cursor-pointer self-end "
      onClick={() => {
        if (!showPopup) {
          setShowPopup(true);
        }
      }}
    >
      <PopupFrame active={showPopup}>
        <div className="h-[550px] w-[790px] rounded-md bg-white shadow-xl p-2 overflow-y-auto">
          <PopupClosebutton
            closeIconColor="black"
            onClose={() => {
              setShowPopup(false);
            }}
          />
          <div className="w-full relative">
          <OptionSelector hideHeader={true} onChange={(value)=>{
            if (props.onUpdateoptionStatus) {
              props.onUpdateoptionStatus(!value.checked)
            }
          }} items={[{name:"default option",checked:props.defaultOptions??false}]}/>
          </div>
         {!props.defaultOptions?<OptionsHandler option={props.option} update={(value)=>{
          if (props.onNewintence) {
            props.onNewintence(value)
          }
         }}/>:null}
        </div>
      </PopupFrame>
      <MoreIcon fill="white" />
    </div>
  );
}

interface ImageUrlProps {
  url: string;
  onDelete: any;
}
function ImageUrl(props: ImageUrlProps) {
  return (
    <div className="my-2 pl-4 relative w-[350px] mx-auto">
      <div className="flex items-center">
        <div className="h-2 w-2 relative bg-white rounded-full mr-2"></div>
        <div className="text-xs">{props.url ?? "items"}</div>
        <div
          className="rotate-45 font-extrabold relative text-xl font-mono ml-4"
          onClick={props.onDelete}
        >
          +
        </div>
      </div>
    </div>
  );
}
