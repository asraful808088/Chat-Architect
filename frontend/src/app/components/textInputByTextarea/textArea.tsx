import { useState } from "react";
import { tabButton } from "../tabButton/tabButton";

interface TextAreaProps {
  type: string;
  onlistOfText: any;
}
export default function TextArea(props: TextAreaProps) {
  const [inputValue, setinputValue] = useState("");
  function multiLineProcess(intent) {
    const newLinelist = intent?.split("\n")?.map((element) => {
      return `${element.trim()}`;
    });
    return newLinelist;
  }
  return (
    <div className="w-full flex">
      <div className="flex-grow border-black border rounded-md">
        <textarea
          name=""
          value={inputValue}
          id=""
          className="w-full text-black p-1 bg-transparent outline-none text-sm"
          placeholder="text"
          onChange={(e) => {
            setinputValue(e.target.value);
          }}
        ></textarea>
      </div>
      <div
        className="h-8 w-8 relative font-extrabold text-3xl text-black p-1 font-mono cursor-pointer"
        onClick={() => {
          if (props.onlistOfText) {
            if (props.type == tabButton.Whole_items_is_One) {
              props.onlistOfText([inputValue]);
              setinputValue("");
            } else if (props.type == tabButton.Multiple_items_in_One) {
              const listOfInput = multiLineProcess(inputValue);
              const removeBrack = listOfInput?.map((element) => element.trim());
              const removeBlank = removeBrack?.filter(
                (element) => element != ""
              );
              console.log(removeBlank);
              props.onlistOfText([...removeBlank]);
              setinputValue("");
            }
          }
        }}
      >
        +
      </div>
    </div>
  );
}
