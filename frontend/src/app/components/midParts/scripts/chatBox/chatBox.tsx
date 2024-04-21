import PopupFrame, {
  PopupClosebutton,
} from "@/app/components/popUpTools/popupTools";
import InfoIcon from "@/assets/svg/352432_info_icon.svg";
import { useEffect, useState } from "react";
import ContainerBox from "../box/ContainerBox";
interface ChatBoxProps {
  items: Array;
  onNewintence: any;
  name:string
}
export default function ChatBox(props: ChatBoxProps) {
  const [items, setItems] = useState([]);
  const [showPopupName, setShowPopupname] = useState(false);
  useEffect(() => {
    setItems(props.items ?[...props.items ]: []);
  }, [props.items]);
  return (
    <div className="w-full overflow-x-auto py-10">
      <PopupFrame active={showPopupName}>
        <div className="w-[600px]  bg-slate-100 rounded-md shadow-2xl p-3">
          <PopupClosebutton
            onClose={() => {
              setShowPopupname(false);
            }}
          />
          <div className="w-full flex justify-center items-center">
            <div className="h-10 w-10 relative mx-2">
              <InfoIcon />
            </div>
            <div className="text-xl mx-2 text-black">Necessary Alert</div>
          </div>
          <div className="my-4 mb-20 relative text-black text-center">
            Attempted to use the same intent multiple times. Please ensure each
            intent is only utilized once for optimal functionality.
          </div>
        </div>
      </PopupFrame>
      {items?.map((element, index) => {
        return (
          <ContainerBoxWithLabel
            onNewintence={(newValue) => {
              const checkIntenceName = items?.find(
                (element) => {
                  if (element.id != newValue.id ) {
                    
                    if (element.intent == newValue.intent && element.intent &&newValue  ) {
                      return true
                    }else{
                      return false
                    }
                  }else{
                    return false
                  }
                }
              );
              if (checkIntenceName) {
                setShowPopupname(true)
                setItems([...items]);
                return;
              }

              const newIntents = items?.map((element) => {
                if (element.id == newValue.id) {
                  return newValue;
                }
                return element;
              });
              setItems(newIntents);
              if (props.onNewintence) {
                props.onNewintence(newIntents);
              }
            }}
            intence={element}
            key={index}
            no={index}
            onDelete={(obj) => {
                

              const newItems = items?.filter((element2) => {
                return element2.id != element.id
              });
              setItems([...newItems])
              if (props.onNewintence) {
                props.onNewintence([...newItems]);
              }
              
            }}
          />
        );
      })}
    </div>
  );
}

interface ContainerBoxWithLabelProps {
  no: number;
  onDelete: any;
  intence: object;
  onNewintence: any;
}
function ContainerBoxWithLabel(props: ContainerBoxWithLabelProps) {
  return (
    <div className="w-full relative">
      <div className="w-full my-5 text-xs font-extrabold text-black">
        Script-{props.no}
      </div>
      <ContainerBox
        onDelete={props.onDelete}
        intence={props.intence ?? null}
        onNewintence={props.onNewintence}
      />
    </div>
  );
}
