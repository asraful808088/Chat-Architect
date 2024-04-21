
import { useState } from "react";
import { PopupClosebutton } from "../popUpTools/popupTools";

interface CreateItemDialogProps {
  Icon: any;
  onClose: any;
  onCreate: any;
}
export default function CreateItemDialog(props: CreateItemDialogProps) {
  const [newName, setNewName] = useState("");
  const [newDescrition, setNewDescrition] = useState("");
  return (
    <div className="p-3 bg-white shadow-2xl rounded-md w-[600px] ">
      <PopupClosebutton
        onClose={() => {
          if (props.onClose) {
            props.onClose();
          }
        }}
      />
      <div className="flex items-center justify-center">
        <div className="h-8 w-8 relative  mx-2 p-1">
          <props.Icon fill="black" />
        </div>
        <div className="text-black mx-2">Create-Item</div>
      </div>

      <div className="w-[400px] relative my-5 m-auto border-b border-black">
        <div className="w-full my-2 text-xs relative text-black">Name</div>
        <div className="w-full">
          <input
            type="text"
            name=""
            id=""
            maxLength={25}
            className="bg-transparent border-none outline-none text-black text-sm w-full"
            placeholder="create name (required)"
            value={newName}
            onChange={(e) => {
              setNewName(e.target.value);
            }}
          />
        </div>
      </div>

      <div className="w-[400px] relative my-5 m-auto border-b border-black">
        <div className="w-full my-2 text-xs relative text-black">
          Description
        </div>
        <div className="w-full">
          <input
            type="text"
            name=""
            id=""
            maxLength={245}
            className="bg-transparent border-none outline-none text-black text-sm w-full"
            placeholder="create description (required)"
            value={newDescrition}
            onChange={(e) => {
              setNewDescrition(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="w-[400px] relative my-10 cursor-pointer flex justify-end  m-auto">
        <div
          className="bg-black  rounded-md shadow-2xl px-4 py-2 text-sm"
          onClick={() => {
            
            if (props.onCreate && !newName.includes(".")) {
              props.onCreate({ newName:newName.replace(" ","_"), newDescrition });
              setNewDescrition("");
              setNewName("");
            }
          }}
        >
          create
        </div>
      </div>
    </div>
  );
}
