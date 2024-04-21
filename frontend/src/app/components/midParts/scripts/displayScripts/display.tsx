import Items from "@/app/components/items";
import ScriptsIcon from "@/assets/svg/scripts.svg";
import { useEffect, useState } from "react";
interface DisplayScriptsItemsProps {
  items: Array;
  onOpen: any;
  onDelete: any;
  Icon:any
}
export default function DisplayItems(props: DisplayScriptsItemsProps) {
  const [items, setitems] = useState([]);
  useEffect(() => {
    if (props.items) {
      setitems(props.items ?? []);
    }
  }, [props.items]);
  return (
    <div className="h-full w-full flex justify-between flex-wrap text-xs">
      {items?.map((element, index) => {
        return (
          <Items
            Icon={props.Icon?? ScriptsIcon}
            name={element.name ?? "unset"}
            des={element.des ?? "unset"}
            key={index}
            onClick={(value) => {
              if (props.onOpen) {
                props.onOpen(value);
              }
            }}
            onDelete={(value) => {
              if (props.onDelete) {
                props.onDelete(value);
              }
            }}
          />
        );
      })}
    </div>
  );
}
