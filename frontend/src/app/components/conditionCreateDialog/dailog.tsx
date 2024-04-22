import ConditionIcon from "@/assets/svg/condition.svg";
import { useEffect, useState } from "react";
import { PopupClosebutton } from "../popUpTools/popupTools";
import { useContext } from "react";
import GlobleData from "@/app/context/data/globle";
interface ConditionCreateBoxProps {
  onClose: any;
  onCreate: any;
}
export default function ConditionCreateBox(props: ConditionCreateBoxProps) {
  
  const [items, setItems] = useState([]);
  const [name, setname] = useState("");
  const [des, setDes] = useState("");
  useEffect(()=>{
    
  },[])
  
  return (
    <div className=" w-[1000px] p-3 shadow-2xl rounded-md bg-white text-black">
      <PopupClosebutton onClose={props.onClose} />
      <div className="my-10 flex justify-center items-center">
        <div className="w-10 h-10 relative mx-2">
          <ConditionIcon fill={"black"} />
        </div>
        <div className="mx-2 text-2xl">Condition</div>
      </div>
      <TextInput
      initValue={name}
        maxLength={25}
        onText={(value) => {

          const triming =value.trim()  
          setname(triming);
        }}
      />
      <TextInput
      
      initValue={des}
        header="description"
        placeholder="white your description"
        maxLength={245}
        onText={(value) => {
            console.log("")
          setDes(value);
        }}
      />
      <div className=" m-auto relative flex">
        <TextInput
        pressActive={true}
          maxLength={25}
          placeholder="add keyword minimum 2 items"
          header="keyword"
          onText={(value) => {
            setItems((prev) => [...new Set([...prev, value])]);
          }}
        />
      </div>
      <div className="m-auto w-[400px] h-[210px] overflow-y-auto">
        <Items

          items={items}
          onDelete={(item) => {
            const newItems = items.filter((element) => element != item);
            setItems([...newItems]);
          }}
        />
      </div>
      <div className=" w-[400px] relative flex justify-end py-2 pb-8 m-auto">
        <div
          className="px-5 py-3 cursor-pointer hover:scale-[1.02] transition-all rounded-md text-xs relative bg-black text-white flex justify-center items-center"
          onClick={() => {
            if (props.onCreate && items.length > 1) {
                
              props.onCreate({ name: name.replace(" ","_"), des: des, items });
              setname("")
                setDes("")
            }
          }}
        >
          Create
        </div>
      </div>
    </div>
  );
}

interface TextInputProps {
  header: string;
  placeholder: string;
  maxLength: number;
  onText: any;
  pressActive:boolean
  initValue:string
}
function TextInput(props: TextInputProps) {
  const [text, setText] = useState("");
  useEffect(()=>{
        setText(props.initValue??"")
  },[props.initValue])
  return (
    <div className="w-[400px] relative m-auto text-xs my-4">
      <div className="">{props.header ?? "name"}</div>
      <div className="w-full h-8 relative">
        <input
          type="text"
          name=""
          id=""
          onKeyDown={(e) => {
            if (props.onText && e.key == "Enter" && props.pressActive && text.length!=0) {
              props.onText(text);
              setText("");
            }
          }}
          value={text}
          maxLength={props.maxLength}
          onChange={(e) => {
            if (props.pressActive) {
                setText(e.target.value);
            }else{
              if (props.onText) {
                props.onText(e.target.value)
              }
            }
          }}
          className="w-full h-full bg-transparent outline-none border-black border-b "
          placeholder={props.placeholder ?? "write you condition name"}
        />
      </div>
    </div>
  );
}

interface RadioButtonProps {
  items: Array;
  onDelete: any;
}
function Items(props: RadioButtonProps) {
  return (
    <div className="py-2 relative flex flex-wrap">
      {props.items?.map((element, index) => {
        return (
          <div
            className="flex items-center text-xs my-2 mx-2 cursor-pointer"
            key={index}
          >
            <div className="h-2 w-2 bg-black rounded-full mr-1"></div>
            <div className="">{element ?? "Items"}</div>
            <div
              className="rotate-45 font-extrabold cursor-pointer font-mono text-xl mx-2"
              onClick={() => {
                if (props.onDelete) {
                  props.onDelete(element);
                }
              }}
            >
              +
            </div>
          </div>
        );
      })}
    </div>
  );
}
