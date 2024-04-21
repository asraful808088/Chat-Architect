import { MidPartType } from "@/app/page";
import ActionIcon from "@/assets/svg/action.svg";
import EntitiesIcon from "@/assets/svg/entities.svg";
import IntentIcon from "@/assets/svg/intent.svg";
import ResponseIcon from "@/assets/svg/response.svg";
import ScriptsIcon from "@/assets/svg/scripts.svg";
import SynIcon from "@/assets/svg/syn.svg";
import ConIcon from "@/assets/svg/condition.svg";
interface MenuProps {
  type: MidPartType;
  onChange: any;
}
export default function Menu(props: MenuProps) {
  return (
    <div className="w-60 h-full pr-2">
      <div className="w-full relative text-black text-xs text-opacity-70 font-extrabold pl-1">
        menu
      </div>
      <div className="w-full relative">
        <MenuItems
          Icon={IntentIcon}
          active={MidPartType.INTENT == props.type}
          name="intent"
          onClick={()=>{
            if (props.onChange) {
              props.onChange(MidPartType.INTENT)
            }
          }}
        />
        <MenuItems
          Icon={ResponseIcon}
          active={MidPartType.RESPONSE == props.type}
          name="response"
          onClick={()=>{
            if (props.onChange) {
              props.onChange(MidPartType.RESPONSE)
            }
          }}
        />
        <MenuItems
          Icon={ActionIcon}
          active={MidPartType.CUSTOM_RESPONSE == props.type}
          name="Custom-Response"
          onClick={()=>{
            if (props.onChange) {
              props.onChange(MidPartType.CUSTOM_RESPONSE)
            }
          }}
        />
        <MenuItems
          Icon={EntitiesIcon}
          active={MidPartType.ENTITIES == props.type}
          name="Entities"
          onClick={()=>{
            if (props.onChange) {
              props.onChange(MidPartType.ENTITIES)
            }
          }}
        /><MenuItems
        Icon={SynIcon}
        active={MidPartType.SYNONYMS == props.type}
        name="Synonyms"
        onClick={()=>{
          if (props.onChange) {
            props.onChange(MidPartType.SYNONYMS)
          }
        }}
      />
        <MenuItems
          Icon={ConIcon}
          active={MidPartType.CONDITION == props.type}
          name="Condition"
          onClick={()=>{
            if (props.onChange) {
              props.onChange(MidPartType.CONDITION)
            }
          }}
        />
        <MenuItems
          Icon={ScriptsIcon}
          active={MidPartType.SCRIPTS == props.type}
          name="Scripts"
          onClick={()=>{
            if (props.onChange) {
              props.onChange(MidPartType.SCRIPTS)
            }
          }}
        />
      </div>
    </div>
  );
}
interface MenuItemsProps {
  name: string;
  Icon: any;
  active: boolean;
  onClick:any
}
function MenuItems(props: MenuItemsProps) {
  return (
    <div
      className={`h-12 w-full ${
        props.active ? "bg-black" : ""
      } my-2 rounded-md ${
        props.active ? "shadow-lg" : ""
      } cursor-pointer flex items-center`}
      onClick={()=>{
        if (props.onClick) {
          props.onClick()
        }
      }}
    >
      <div className="w-8 h-8  mx-2 p-1">
        {<props.Icon fill={props.active ? "white" : "black"} />}
      </div>
      <div
        className={`capitalize ${props.active ? "text-white" : "text-black"}`}
      >
        {props.name ?? "Itemname"}
      </div>
    </div>
  );
}
