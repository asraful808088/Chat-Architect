import { PopupClosebutton } from "../popUpTools/popupTools"
import InfoIcon from "@/assets/svg/352432_info_icon.svg";
interface PermissionPopupProps{
    onYes:any
    onNo:any
    header:string
    message:string
    onClose:any
}
export default function PermissionPopup(props:PermissionPopupProps){
    return  <div className="w-[600px]  bg-slate-100 rounded-md shadow-2xl p-3">
    <PopupClosebutton
      onClose={() => {
        if (props.onClose) {
            props.onClose()
        }
      }}
    />
    <div className="w-full flex justify-center items-center">
      <div className="h-10 w-10 relative mx-2">
        <InfoIcon />
      </div>
      <div className="text-xl mx-2 text-black">{props.header?? "Are Your Sure ??"}</div>
    </div>
    <div className="my-4  relative text-black text-center">
      {props.message?? "Do you want to delete this item?"}
    </div>
    <div className="w-full relative flex items-center justify-center mb-16 mt-10">
          <div className="p-3 mx-3 bg-red-900 px-6 relative rounded-md text-xs shadow-2xl cursor-pointer" onClick={()=>{
            if (props.onYes) {
                props.onYes()
            }
          }}>
                  Yes
          </div>
          <div className="p-3 mx-3 bg-green-900 px-6 relative rounded-md text-xs shadow-2xl cursor-pointer"onClick={()=>{
              
              if (props.onYes) {
                props.onNo()
            }
          }}>
                  No
          </div>
    </div>
  </div>
}