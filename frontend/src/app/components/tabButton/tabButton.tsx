"use client";
import { useEffect, useState } from "react";
interface TabbuttonProps {
  activeItem: string;
  entitiesOption: boolean;
  onClick: any;
}
export interface ButtonType {
  Multiple_items_in_One;
  Whole_items_is_One;
  Entities_injection;
}
export const tabButton: ButtonType = {
  Multiple_items_in_One: "Multiple_items_in_One",
  Whole_items_is_One: "whole_items_is_One",
  Entities_injection: "entities_injection",
};
export default function Tabbutton(props: TabbuttonProps) {
  const [activeButton, setActiveButton] = useState();
  useEffect(() => {
    setActiveButton(props.activeItem ?? tabButton.Whole_items_is_One);
  }, [props.activeItem]);
  return (
    <div className="w-full flex my-2">
      <SingleButton
      
        onClick={()=>{
          if (props.onClick) {
            props.onClick(tabButton.Whole_items_is_One)
          }
        }}
        name="whole items is One"
        active={activeButton == tabButton.Whole_items_is_One}
      />
      <SingleButton
       onClick={()=>{
          if (props.onClick) {
            props.onClick(tabButton.Multiple_items_in_One)
          }
        }}
        name="Multiple items in One"
        active={activeButton == tabButton.Multiple_items_in_One}
      />
      {props.entitiesOption ? (
        <SingleButton
         onClick={()=>{
          if (props.onClick) {
            props.onClick(tabButton.Entities_injection)
          }
        }}
          name="entities injection"
          active={activeButton == tabButton.Multiple_items_in_One}
        />
      ) : null}
    </div>
  );
}
interface SingleButtonProps {
  name: string;
  active: boolean;
  onClick:any
}
function SingleButton(props: SingleButtonProps) {
  return (
    <div
    onClick={props.onClick}
      className={`${
        props.active ? "border-b-2" : ""
      } border-black text-black cursor-pointer capitalize py-2 mr-4 text-xs`}
    >
      {props.name ?? "asdad"}
    </div>
  );
}
