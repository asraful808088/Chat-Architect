"use client";
import Checked from "@/assets/svg/checked.svg";
import Unchecked from "@/assets/svg/unchecked.svg";
import PopupFrame from "../popUpTools/popupTools";
interface OptionSelectorProps {
  items: Array<object>;
  onChange: any;
  hideHeader: boolean;
  enableTh: boolean;
  activePopup: boolean;
  PopupChild: React.ReactNode;
  onOpenPopup: any;
}
export default function OptionSelector(props: OptionSelectorProps) {
  return (
    <div className="w-full my-2">
      {!props.hideHeader ? (
        <div className="text-black text-opacity-50 text-sm">option</div>
      ) : null}
      <div className="w-full flex flex-wrap my-1 ">
        {props.items?.map((element, index) => {
          return (
            <OptionsItems
              PopupChild={props.PopupChild}
              activePopup={props.activePopup}
              enableTh={element.options}
              key={index}
              name={element.name ?? "unset"}
              checked={element.checked}
              onOpenPopup={(obj) => {
                if (props.onOpenPopup) {
                  props.onOpenPopup(obj);
                }
              }}
              onChange={(obj) => {
                if (props.onChange) {
                  props.onChange(obj);
                }
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

interface OptionsItemsProps {
  onChange: any;
  name: string;
  checked: boolean;
  enableTh: boolean;
  activePopup: boolean;
  PopupChild: React.ReactNode;
  onOpenPopup: any;
}
function OptionsItems(props: OptionsItemsProps) {
  return (
    <div className="mr-2 my-1 flex flex-wrap">
      <PopupFrame active={props.activePopup}>{props.PopupChild}</PopupFrame>
      <div
        className="w-4 h-4 relative cursor-pointer mr-1"
        onClick={() => {
          if (props.onChange) {
            props.onChange({ checked: props.checked, name: props.name });
          }
        }}
      >
        {props.checked ? <Checked fill="black" /> : <Unchecked fill="black" />}
      </div>
      <div
        className="text-black text-xs cursor-pointer"
        onClick={() => {
          if (props.enableTh) {
            if (props.onOpenPopup) {
              props.onOpenPopup({
                name: props.name,
              });
            }
          }
        }}
      >
        {props.name ?? "default Text "}
      </div>
    </div>
  );
}
