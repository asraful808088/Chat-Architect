import GlobleData from "@/app/context/data/globle";
import IntentIcon from "@/assets/svg/intent.svg";
import { useContext, useEffect, useState } from "react";
import BodyHeader from "../../bodyHeader/header";
import CreateItemDialog from "../../create_items_dialog/create_items";
import ItemsLoader from "../../itemsLoader/itemLoader";
import PopupFrame from "../../popUpTools/popupTools";
import Tabbutton, { tabButton } from "../../tabButton/tabButton";
import TextArea from "../../textInputByTextarea/textArea";
import DisplayItems from "../scripts/displayScripts/display";
import OptionItems from "../scripts/parts/buttonHandlers";
import { OptionType, createDefaultOptions } from "./default/option";
import OptionsHandler from "./optionHandler/option";
import { uuid } from "uuidv4";

interface IntentMidProps {}
export default function IntentMid(props: IntentMidProps) {
  const allIntence = useContext(GlobleData);

  const [details, setDetails] = useState(null);
  const [intentList, setIntentList] = useState([]);
  const [createPopup, setCreatePopup] = useState(false);
  useEffect(() => {
    if (allIntence.socket) {
      allIntence.socket.on("collectIntent", (data) => {
        setIntentList(data.items ?? []);
      });
      allIntence.socket.on("collectIntentDetails", (data) => {
        
        setDetails({...data.item});
      });
      allIntence.socket.emit("intent", {
        type: "get",
      });
    }
  }, [allIntence.socket]);
  return (
    <div className="w-full  relative overflow-y-auto"  style={{
      height:"calc(100vh - 120px)"
    }}>
      <PopupFrame active={createPopup}>
        <CreateItemDialog
          Icon={IntentIcon}
          onCreate={(value) => {
            if (value.newDescrition && value.newName) {
              if (allIntence.socket) {
                allIntence.socket.emit("intent", {
                  type: "createIntent",
                  ...value,
                  options: createDefaultOptions(),
                });
              }
            }
          }}
          onClose={() => {
            setCreatePopup(false);
          }}
        />
      </PopupFrame>




      <BodyHeader name="Intent" />
      {!details?<OptionItems
        onCreateItem={() => {
          setCreatePopup(true);
        }}
      />:<div className="w-full flex justify-end items-center ">
       <div className="relative border border-black p-2 px-3 text-black rounded-md text-xs cursor-pointer" onClick={()=>{
        if (allIntence.socket) {
          allIntence.socket.emit("intent", {
            type: "sync",
            name:details.name
          });
        }
        
       }}>
       sync now
       </div>
      </div>}
      
      {details ? (
        <Details options={details.option} items={details.items} name={details.name} des={details.des} onChange={(value) => {

        }} />
      ) : (
        <DisplayItems
          onDelete={(value) => {
            if (allIntence.socket) {
              allIntence.socket.emit("intent", {
                type: "delete",
                name: value.name,
              });
            }
          }}
          onOpen={(value) => {
            if (allIntence.socket) {
              allIntence.socket.emit("intent", {
                type: "openCode",
                name: value,
              });
            }
          }}
          items={intentList}
        />
      )}
    </div>
  );
}

interface DetailsProps {
  options: object;
  onChange: any;
  name:string
des:string
items:Array
}

function Details(props: DetailsProps) {
  const allIntence = useContext(GlobleData);
  const [globleOption, setGlobleOption] = useState<OptionType>(
    createDefaultOptions()
  );
  useEffect(() => {
    setGlobleOption(props.options ?? createDefaultOptions());
    setItems(props.items??[])
  }, [props.items, props.options]);
  const [items, setItems] = useState([]);
  const [optionPopup, setOptionpopup] = useState(false);
  const [outTypeofinput, setOutputTypeOfinput] = useState(
    tabButton.Whole_items_is_One
  );

  return (
    <>
      <OptionsHandler
        option={globleOption}
        update={(updateValue) => {
          allIntence.socket.emit("intent", {
            type: "update",
            options:updateValue,
            items,
            name:props.name,
            des:props.des
          });
        }}
      />
      <Tabbutton
        activeItem={outTypeofinput}
        onClick={(value) => {
          setOutputTypeOfinput(value);
        }}
      />
      <TextArea
        type={outTypeofinput}
        onlistOfText={(value) => {
          const filter = value.filter(
            (element) => !(element == "" || element == " ")
          );
          if (filter.length != 0) {
            const options = createDefaultOptions();
            const buildIntent = value.map((element) => {
              return { text: element, option: options, name: props.name,id:uuid(),defaultOptions:true,process:false };
            });
            const newItems = [...items, ...buildIntent]
            setItems(newItems);
            allIntence.socket.emit("intent", {
              type: "update",
              options:props.options,
              items:newItems,
              name:props.name,
              des:props.des
            });
          }
        }}
      />
      <ItemsLoader onDelete={(value)=>{
        allIntence.socket.emit("intent", {
          type: "itemDelete",
          item:value,
        });
      }} onNewintence={(newValue)=>{
        setItems(newValue)
       allIntence.socket.emit("intent", {
            type: "update",
            options:props.options,
            items:newValue,
            name:props.name,
            des:props.des
          });
      }} items={items} />
    </>
  );
}
