import { PopupClosebutton } from "@/app/components/popUpTools/popupTools";
import GlobleData from "@/app/context/data/globle";
import ConditonIcon from "@/assets/svg/condition.svg";
import IntentIcon from "@/assets/svg/intent.svg";
import ResponseIcon from "@/assets/svg/response.svg";
import { useContext, useEffect, useState } from "react";
interface PopupTemplatesProps {
  option: object;
  onCallback: any;
  onClose: any;
}
export default function PopupTemplates(props: PopupTemplatesProps) {
  
  const context = useContext(GlobleData);
  const [gotItems, setGotitems] = useState([]);
  const [gotConditions, setGotConditions] = useState([]);
  useEffect(() => {
    context.socket?.on("search", (data) => {
      if (data.type == "condition") {
        setGotConditions(data.items);
        const items = data.items?.map((element) => element.name);
        setGotitems(items);
      } else {
        setGotitems(data.items);
      }
    });
  }, [context.socket]);
  return (
    <div className="w-[700px]  bg-black rounded-md pt-4">
      <PopupClosebutton
        closeIconColor="white"
        onClose={() => {
          if (props.onClose) {
            props.onClose();
          }
        }}
      />
      <div className="flex items-center w-full justify-center my-7">
        <div className="h-12 w-12 relative m-2 mx-5">
          {props.option?.type == "intent" ? (
            <IntentIcon fill="white" />
          ) : props.option?.type == "res_action" ? (
            <ResponseIcon fill="white" />
          ) : (
            <ConditonIcon fill="white" />
          )}
        </div>
        <div className="text-xl text-white">
          Add-
          {props.option?.type == "intent"
            ? "Intent"
            : props.option?.type == "res_action"
            ? "Response"
            : "Conditions"}
        </div>
      </div>

      <div className="w-[400px] relative h-10 border-b border-white m-auto my-4">
        <input
          type="text"
          name=""
          id=""
          className=" bg-transparent text-sm border-none outline-none h-full w-full text-white"
          placeholder="search"
          onChange={(e) => {
            if (e.target.value.length != 0) {
              if (context.socket) {
                context.socket.emit("search", {
                  type: props.option?.type,
                  value: e.target.value,
                  id: props.intence?.id,
                });
              }
            } else {
              setGotitems([]);
            }
          }}
        />
      </div>
      <div className="w-[400px]  h-[240px] m-auto relative px-1 overflow-y-auto">
        {gotItems.map((element, key) => {
          return (
            <SearchItem
              key={key}
              onClick={() => {
                if (props.onCallback) {
                  if (props.option?.type == "condition") {
                    const findItems = gotConditions.find(
                      (element2) => element2.name == element
                    );
                    props.onCallback({
                      ...props.option,
                      item: element,
                      options: findItems.items,
                    });
                  } else {
                    props.onCallback({
                      ...props.option,
                      item: element,
                      options: null,
                    });
                  }
                }
                if (props.onClose) {
                  props.onClose();
                }
              }}
              name={element}
              Icon={
                props.option?.type == "intent"
                  ? IntentIcon
                  : props.option?.type == "res_action"
                  ? ResponseIcon
                  : ConditonIcon
              }
            />
          );
        })}
      </div>
    </div>
  );
}

interface SearchItemProps {
  Icon: any;
  name: string;
  onClick: any;
}
function SearchItem(props: SearchItemProps) {
  return (
    <div
      className="flex items-center h-10 bg-white rounded-md w-full my-1 cursor-pointer"
      onClick={() => {
        if (props.onClick) {
          props.onClick(props.name);
        }
      }}
    >
      <div className="w-8 h-8 relative mx-2">
        <props.Icon fill="black" />
      </div>
      <div className="mx-2">{props.name ?? "items"}</div>
    </div>
  );
}
