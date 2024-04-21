import GlobleData from "@/app/context/data/globle";
import AddIcon from "@/assets/svg/add-square-svgrepo-com.svg";
import SynIcon from "@/assets/svg/syn.svg";
import { useContext, useEffect, useState } from "react";
import BodyHeader from "../../bodyHeader/header";
import CreateItemDialog from "../../create_items_dialog/create_items";
import PopupFrame from "../../popUpTools/popupTools";
import DisplayItems from "../scripts/displayScripts/display";
import Options from "../scripts/parts/buttonHandlers";
interface SynonymsProps {}
export default function Synonyms(props: SynonymsProps) {
  const allIntence = useContext(GlobleData);
  const [popupShow, setPopupShowStatus] = useState(false);
  const [items, setItems] = useState([]);
  const [itemDetails,setItemDetails] = useState(null)
  useEffect(() => {
    if (allIntence.socket) {
      allIntence.socket.on("collectItems", (data) => {
        setItems(data.items);
      });
      allIntence.socket.on("details", (data) => {
        setItemDetails(data.item)
      });
      allIntence.socket.emit("synonyms", {
        type: "get",
      });
    }
  }, [allIntence.socket]);
  return (
    <div className="w-full relative  " style={{
      height:"calc(100vh - 120px)"
    }}>
      <PopupFrame active={popupShow}>
        <CreateItemDialog
          onCreate={(value) => {
            if (value.newName && value.newDescrition && allIntence.socket) {
              allIntence.socket.emit("synonyms", {
                type: "create",
                ...value,
              });
            }
          }}
          Icon={SynIcon}
          onClose={() => {
            setPopupShowStatus(false);
          }}
        />
      </PopupFrame>
      <BodyHeader />
      <Options
        onCreateItem={() => {
          setPopupShowStatus(true);
        }}
      />
      {!itemDetails? <DisplayItems
        items={items}
        onOpen={(value)=>{
          if (allIntence.socket) {
            allIntence.socket.emit("synonyms", {
              type: "getDetails",
              name: value
            });
          }
          
        }}
        onDelete={(value) => {
          if (allIntence.socket) {
            allIntence.socket.emit("synonyms", {
              type: "delete",
              name: value.name,
            });
          }
         
        }}
      />:<Details initValue={itemDetails?.items??[]} onNewintence={(newValue)=>{
        if (allIntence.socket) {
          allIntence.socket.emit("synonyms", {
            type: "update",
            items: newValue,
            name:itemDetails.name,
            des:itemDetails.des
          });
        }
      }}/>}
    </div>
  );
}

interface SingleItemProps {
  name: string;
  items: Array;
  onDelete: any;
  onDeleteItemOfItems: any;
  onAddItemOfItems: any;
}
function SingleItem(props: SingleItemProps) {
  const [inputValue, setInputValue] = useState("");
  return (
    <div className="w-full my-3">
      <div className="w-full flex items-center text-black text-sm">
        {props.name ?? "no-name"}
        <div className="w-auto mx-2">
          <input
            type="text"
            name=""
            id=""
            placeholder="add synonyms"
            className="bg-transparent text-xs p-1"
            value={inputValue}
            onKeyDown={(e) => {
              const findValue = props?.items?.find(
                (element) => element == inputValue
              );
              if (
                e.key == "Enter" &&
                inputValue &&
                props.onAddItemOfItems &&
                !findValue
              ) {
                setInputValue("");
                props.onAddItemOfItems({ name: props.name, value: inputValue });
              }
            }}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
          />
        </div>
        <div
          className="font-extrabold relative rotate-45 text-2xl font-mono cursor-pointer flex items-center "
          onClick={() => {
            if (props.onDelete) {
              props.onDelete(props.name);
            }
          }}
        >
          +
        </div>
      </div>
      {props?.items?.map((element, index) => {
        return (
          <div className="ml-2" key={index}>
            <div className="h-5 w-[1px] bg-black ml-[9px]"></div>
            <div className="w-full flex items-center">
              <div className="rounded-full border-black border text-black  group text-[8px] h-[20px] w-[20px] p-1 flex items-center justify-center">
                <span className="group-hover:hidden flex items-center justify-center">
                  {index + 1}
                </span>
                <span
                  className="hidden group-hover:flex w-fit h-fit font-extrabold font-mono text-xl rotate-45 cursor-pointer ml-[1px]"
                  onClick={() => {
                    if (props.onDeleteItemOfItems) {
                      props.onDeleteItemOfItems({
                        name: props.name,
                        value: element,
                      });
                    }
                  }}
                >
                  +
                </span>
              </div>
              <div className="h-[1px] w-5 bg-black"></div>
              <div className="text-xs text-black ml-1">{element}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

interface DetailsProps {
  onNewintence:any
  initValue:Array
}
function Details(props: DetailsProps) {
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState("");
  useEffect(()=>{
    setItems(props.initValue??[])
  },[props.initValue])

  return (
    <>
      <div className="h-10  relative border-b-2 border-black my-4 flex items-center">
        <input
          type="text"
          name=""
          value={inputValue}
          id=""
          className="border-none outline-none bg-transparent text-black flex-grow"
          placeholder="word"
          onKeyDown={(e) => {
            const find = items.find((element) => element.name == inputValue);
            if (e.key == "Enter" && inputValue && !find) {
              setInputValue("");
              const newItems = [...items, { name: inputValue, items: [] }]
              if (props.onNewintence) {
                props.onNewintence(newItems)
              }
              setItems(newItems);
            }
          }}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
        <div
          className="h-8 w-8 relative cursor-pointer hover:scale-[1.05] transition-all rounded-md"
          onClick={() => {
            const find = items.find((element) => element.name == inputValue);
            if (inputValue && !find) {
              setInputValue("");
              const newItems =[...items, { name: inputValue, items: [] }]
              setItems(newItems);
              if (props.onNewintence) {
                props.onNewintence(newItems)
              }
            }
          }}
        >
          <AddIcon fill="white" />
        </div>
      </div>
      <div className="h-[77%] w-full relative  overflow-y-auto">
        {items.map((element, index) => {
          return (
            <SingleItem
              onAddItemOfItems={({ value, name }) => {
                const newItems = items.map((element, index) => {
                  if (element.name == name) {
                    return {
                      ...element,
                      items: [...element.items, value],
                    };
                  }
                  return element;
                });
                setItems([...newItems]);
                if (props.onNewintence) {
                  props.onNewintence(newItems)
                }
              }}
              onDeleteItemOfItems={({ value, name }) => {
                const newItems = items.map((element, index) => {
                  if (element.name == name) {
                    const newItems = element?.items?.filter(
                      (element) => element != value
                    );
                    return {
                      ...element,
                      items: newItems,
                    };
                  }
                  return element;
                });
                setItems([...newItems]);
                if (props.onNewintence) {
                  props.onNewintence(newItems)
                }
              }}
              name={element.name}
              items={element.items}
              key={index}
              onDelete={(name) => {
                const newArray = items.filter(
                  (element) => element.name != name
                );
                setItems([...newArray]);
                if (props.onNewintence) {
                  props.onNewintence(newArray)
                }
              }}
            />
          );
        })}
      </div>
    </>
  );
}
