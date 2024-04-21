"use client";

import { useEffect, useState } from "react";
import ItemsSelector from "../itemsSeector/selector";
interface InputWithSelectorProps {
  items: Array;
  onChange: any;
  onAddItems: any;
  onDelete: any;
  defalutSelector: any;
  inputTypeInt: boolean;
  placeholder: string;
  inputTypeText: boolean;
}
export default function InputWithSelector(props: InputWithSelectorProps) {
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState([]);
  useEffect(() => {
    setItems(props.items ?? []);
  }, [props.items]);
  return (
    <div className="relative">
      <div className="border-b border-white py-1 w-[200px]">
        <input
          maxLength={20}
          type={props.inputTypeText ? "text" : "number"}
          name=""
          className="bg-transparent border-none outline-none text-xs w-full"
          placeholder={props.placeholder ?? "placeholder"}
          id=""
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          onKeyDown={(e) => {
            if (!props.inputTypeText) {
              if (e.key == "Enter" && inputValue.length != 0) {
                let testValue;
                if (props.inputTypeInt) {
                  testValue = 0 < inputValue ? inputValue : 1;
                  testValue = parseInt(Math.ceil(testValue));
                } else {
                  testValue = 0 < inputValue ? inputValue : 0.001;
                }
                setItems((prev) => [testValue, ...prev]);
                setInputValue("");
                if (props.onAddItems) {
                  props.onAddItems(testValue);
                }
              }
            } else {
              if (inputValue.length != 0 && e.key == "Enter") {
                setItems((prev) => [inputValue, ...prev]);
                setInputValue("");
                if (props.onAddItems) {
                  let accvalue = 1 
                  if (1<inputValue) {
                    accvalue = 1
                  }else if (0>inputValue) {
                    accvalue = 0.0001
                  }
                  props.onAddItems(accvalue);
                }
              }
            }
          }}
        />
      </div>
      <ItemsSelector
        defaultValue={props.defalutSelector}
        items={items}
        onDelete={(name) => {
          if (props.onDelete) {
            props.onDelete(name);
          }
        }}
        onChange={(value) => {
          if (props.onChange) {
            props.onChange(value);
          }
        }}
      />
    </div>
  );
}
