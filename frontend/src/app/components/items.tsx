import DeleteIcon from "@/assets/svg/delete.svg";
import PopupFrame from "./popUpTools/popupTools";
import { PopupClosebutton } from "./popUpTools/popupTools";
import PermissionPopup from "./permissionDialog/dialog";
import { useState } from "react";
interface ItemsProps {
    name: string;
    des: string;
    onDelete: any;
    onClick: any;
    Icon:any
  }
export default  function Items(props: ItemsProps) {
  
    const [showDialog, setShowDialog] = useState(false);
    return (
      <div className="w-[300px] h-[300px] p-3 relative rounded-md shadow-2xl bg-black my-2 mr-2 flex flex-col justify-between">
        <PopupFrame active={showDialog}>
          <PermissionPopup
            onClose={() => {
              setShowDialog(false);
            }}
            onNo={() => {
              setShowDialog(false);
            }}
            onYes={() => {
              setShowDialog(false);
              if (props.onDelete) {
                props.onDelete({ name: props.name });
              }
            }}
          />
        </PopupFrame>
        <div
          className="flex items-center cursor-pointer"
          onClick={() => {
            if (props.onClick) {
              props.onClick(props.name);
            }
          }}
        >
          <div className="w-8 h-8 relative p-2 mx-1">
            <props.Icon fill="white" />
          </div>
          <div className="text-sm font-extrabold my-2 cursor-pointer">
            {props.name.replace(".build","") ?? "Script"}
          </div>
        </div>
        <div
          className="my-3 min-h-36 text-xs text-center flex-grow  flex justify-center items-center cursor-pointer"
          onClick={() => {
            if (props.onClick) {
              props.onClick(props.name);
            }
          }}
        >
          {props.des ??
            `Lorem ipsum dolor sit amet Animi, maiores velit corrupti doloremque est
          cum explicabo repellendus sunt voluptas laboriosam eligendi dicta
          commodi tenetur officiis unde quia! Neque deleniti vel numquam tenetur
          quo laborum?`}
        </div>
        <div className="w-full flex justify-end">
          {!props.name.includes(".build")?
            <div
            className="w-8 h-8 relative p-2 mx-1 hover:scale-[1.02] transition-all cursor-pointer"
            onClick={() => {
              setShowDialog(true);
            }}
          >
            <DeleteIcon fill="white" />
          </div>:null
          }
        </div>
      </div>
    );
  }