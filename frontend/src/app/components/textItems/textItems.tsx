"use client";
import useTools from "@/app/hook/useTools/useTools";
import DeleteIcon from "@/assets/svg/delete.svg";
import TextIcon from "@/assets/svg/text.svg";
import { useState } from "react";
import CardHeader from "../cardheader/cardHeader";
import PopupFrame, { PopupClosebutton } from "../popUpTools/popupTools";
import WordTracker from "../wordTracker/wordTracker";
import MoreIcon from '@/assets/svg/list-svgrepo-com.svg'
import MoreOptions from "./moreOptions/options";
interface TextItemProps {
  textModifyOff: boolean;
  text:string
  onImageUrls:Array
  initUrls:Array
  options:object
  onUpdateOption:any
  onDelete:any
  onUpdateSyn:any
  syn:any
  onUpdateDefaultoptions:any
  defaultOptions:boolean
}
export default function TextItem(props: TextItemProps) {
  const [showOtherOption, setShowOtherOption] = useState(false);
  const [listOfSyn, setListOfSyn] = useState([]);
  const [imageUrls,setImageUrls] = useState([])
  const { cleanPunctuationAroundWord } = useTools();
  useState(()=>{
    setImageUrls([...props.initUrls])
    setListOfSyn(props.syn??[])
  },[])
  return (
    <div className="w-[300px]  bg-black my-2 shadow-lg flex flex-col rounded-md cursor-pointer p-4 mx-2">
      <PopupFrame active={showOtherOption} blurColor="rgb(255,255,255,.5)">
        <div className="h-[700px] w-[800px] bg-black rounded-md px-2">
          <PopupClosebutton
            closeIconColor="white"
            onClose={() => {
              setShowOtherOption(false);
            }}
          />
          <CardHeader name="Text" />
          <div className="text-sm h-[170px] overflow-y-auto overflow-x-hidden">
            <WordTracker
              onSelect={(obj) => {
                const word = cleanPunctuationAroundWord(obj.word.trim());
                const result = listOfSyn.find(
                  (element, index) => element.mainWord == word
                );
                if (result) {
                  return;
                }
                const newSynItems = [
                  ...listOfSyn,
                  {
                    mainWord: word,
                    items: [],
                  },
                ] 
                setListOfSyn(newSynItems);
                if (props.onUpdateSyn) {
                  props.onUpdateSyn(newSynItems)
                }
              }}
              text={props.text}
            />
          </div>
          <div className="h-2"></div>
          <CardHeader name="Synonyms" />
          <div className="w-full h-[370px] overflow-y-auto">
            {listOfSyn?.map((element, index) => {
              return (
                <AddSynWord
                  name={element.mainWord}
                  key={index}
                  items={element.items}
                  onDelete={(obj) => {
                    const newItens = listOfSyn.map((element, index) => {
                      if (element.mainWord == obj.mainWord) {
                        const oldObj = element;
                        const itemsofOldObj = element.items;
                        const newItems = itemsofOldObj.filter(
                          (element, index) => element != obj.item
                        );
                        return {
                          ...oldObj,
                          items: newItems,
                        };
                      } else {
                        return element;
                      }
                    });
                    const newSynItems = [...newItens]
                    setListOfSyn(newSynItems);
                    if (props.onUpdateSyn) {
                  props.onUpdateSyn(newSynItems)
                }
                  }}
                  onChange={(values) => {
                    const newItems = listOfSyn.map((element, index) => {
                      if (element.mainWord == values.name) {
                        const allitems = [...element.items, ...values.newItems];
                        const uniqueitems = new Set(allitems);
                        element.items = [...uniqueitems];
                        return element;
                      } else {
                        return element;
                      }
                    });
                    const newSynItems = [...newItems]
                    setListOfSyn(newSynItems);
                    if (props.onUpdateSyn) {
                  props.onUpdateSyn(newSynItems)
                }
                  }}
                />
              );
            })}
          </div>
          <div className="w-full flex justify-end ">
            <div className="h-10 w-32 flex justify-center items-center relative rounded-md bg-slate-600 mr-5 hover:scale-[1.03] transition-all">
              save
            </div>
          </div>
        </div>
      </PopupFrame>
      <div className="w-[23px] h-[23px] relative p-1 mr-1">
        <TextIcon fill="white" />
      </div>
      <div
        className="flex-grow  max-h-[190px] text-sm overflow-hidden text-ellipsis mt-2"
        onClick={() => {
          if (!showOtherOption && !props.textModifyOff) {
            setShowOtherOption(true);
          }
        }}
      >
        <div className="  h-full w-full text-ellipsis   overflow-hidden  text-xs">
          {props.text} 
        </div>
      </div>
      <div className="flex w-full justify-between mt-5 mb-1">
      <MoreOptions option={props.options} defaultOptions={props.defaultOptions} onUpdateoptionStatus={(value)=>{
        if (props.onUpdateDefaultoptions) {
          props.onUpdateDefaultoptions(value)
        }
      }} onNewintence={(items)=>{
        if (props.onUpdateOption) {
          props.onUpdateOption(items)
        }
         
      }} initItems={imageUrls}/>
        <div className="w-[23px] h-[23px] relative p-[2px] cursor-pointer self-end" onClick={()=>{
          if (props.onDelete) {
            props.onDelete()
          }
        }}>
          <DeleteIcon fill="white" />
        </div>
      </div>
    </div>
  );
}
interface AddSynWordProps {
  name: string;
  items: Array;
  onChange: any;
  onDelete: any;
}
function AddSynWord(props: AddSynWordProps) {
  const [text, setText] = useState("");
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      if (props.onChange) {
        const values = text.split(",");
        props.onChange({ name: props.name, newItems: values });
      }
      setText("");
    }
  };
  return (
    <div className="w-full my-2">
      <div className="w-full flex items-center">
        <div className="text-sm">{props.name ?? "word"}</div>
        <div className="mx-2 border rounded-md">
          <input
            type="text"
            name=""
            id=""
            className="text-sm bg-transparent outline-none border-none px-1"
            value={text}
            onKeyDown={handleKeyDown}
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="my-2 p-1 w-[92%] ml-[5%] ">
        {props.items?.map((element, index) => {
          return (
            <SynonymsItem
              name={element}
              key={index}
              onDeleteItem={(name) => {
                if (props.onDelete) {
                  props.onDelete({
                    mainWord: props.name,
                    item: name,
                  });
                }
              }}
              lastItems={index == props.items.length - 1}
            />
          );
        })}
      </div>
    </div>
  );
}
interface SynonymsItemProps {
  name: string;
  lastItems: boolean;
  onDeleteItem: any;
}
function SynonymsItem(props: SynonymsItemProps) {
  return (
    <div className="py-2 text-xs flex items-center relative">
      <div className="h-2 w-2 rounded-full bg-white"></div>
      <div className="h-[1px] w-2 mx-1  bg-white"></div>
      <div className="flex items-center ">
        <div>{props.name ?? "Items"}</div>
        <div
          className="rotate-45 font-mono font-extrabold text-2xl mx-2"
          onClick={() => {
            if (props.onDeleteItem) {
              props.onDeleteItem(props.name);
            }
          }}
        >
          +
        </div>
      </div>
      {!props.lastItems ? (
        <div className="absolute h-2 w-[1px] mx-1 -bottom-1 bg-white  bg-opacity-50"></div>
      ) : null}
    </div>
  );
}
