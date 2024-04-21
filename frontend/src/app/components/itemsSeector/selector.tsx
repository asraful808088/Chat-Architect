"use client";

import { useEffect, useState } from "react";

interface ItemsSelectorProps {
  className: string;
  onChange: any;
  items: Array;
  defaultValue: string;
  onDelete: any;
  closeSignOff: boolean;
  displayBoxUpdateClose: boolean;
  blackBorder:boolean
}
export default function ItemsSelector(props: ItemsSelectorProps) {
  const [listOfItems, setListOfItems] = useState([]);
  const [activeItems, setActiveItems] = useState(null);
  const [showItems, setShowItems] = useState(false);
  useEffect(() => {
    setActiveItems(props.defaultValue ?? null);
    setListOfItems(props.items ?? []);
  }, [props.defaultValue, props.items]);
  return (
    <div
      className={`${props.className} my-4 text-xs py-1 border rounded-md p-1 h-7 ${props.blackBorder?"border-black":"border-white"} w-[200px] relative  cursor-pointer`}
    >
      <div
        className="h-full w-full relative flex items-center whitespace-nowrap text-ellipsis overflow-hidden"
        onClick={() => {
          if (
            (props.items && props?.items?.length != 0) ||
            (props?.items?.length > 1 && activeItems == null)
          ) {
            setShowItems(true);
          }
        }}
      >
        <div className="w-full text-ellipsis overflow-hidden">
        {activeItems ?? "Select"}
        </div>
      </div>
      <div
        className={`w-full  my-3 bg-white left-0 text-black shadow-md shadow-gray-500 rounded-md  relative p-1 ${
          showItems ? "" : "hidden"
        }`}
      >
        {listOfItems.map((element, index) => {
          if (element == activeItems) {
            return;
          }
         if (element=="none" && !activeItems) {
          return;
          
         }
          return (
            <Items
              closeSignOff={props.closeSignOff || element == "default"}
              key={index}
              name={element}
              onDelete={(name) => {
                if (name == activeItems) {
                  setActiveItems(null);
                }
                if (props.onDelete) {
                  props.onDelete(name);
                }
                setShowItems(false);
              }}
              onPress={(name) => {
                if (!props.displayBoxUpdateClose) {
                  setActiveItems(name);
                }

                setShowItems(false);
                if (props.onChange) {
                  props.onChange(name);
                }
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

interface ItemsProps {
  name: string;
  onPress: any;
  onDelete: any;
  closeSignOff: boolean;
}

function Items(props: ItemsProps) {
  return (
    <div className="h-7 w-full my-1 flex items-center justify-between">
      <div
        className="flex-grow"
        onClick={() => {
          if (props.onPress) {
            props.onPress(props.name);
          }
        }}
      >
        {props.name ?? "items"}
      </div>
      {!props.closeSignOff ? (
        <div
          className="font-mono font-extrabold rotate-45 text-lg"
          onClick={() => {
            if (props.onDelete) {
              props.onDelete(props.name);
            }
          }}
        >
          +
        </div>
      ) : null}
    </div>
  );
}
