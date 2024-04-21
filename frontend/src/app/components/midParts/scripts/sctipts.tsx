import GlobleData from "@/app/context/data/globle";
import ScriptsIcon from "@/assets/svg/scripts.svg";
import { useContext, useEffect, useState } from "react";
import BodyHeader from "../../bodyHeader/header";
import CreateItemDialog from "../../create_items_dialog/create_items";
import PopupFrame from "../../popUpTools/popupTools";
import DisplayScriptsItems from "./displayScripts/display";
import OptionSelector from "./parts/buttonHandlers";
import ChatBox from "./chatBox/chatBox";
import Header from "../../header/header";
import ItemsSelector from "../../itemsSeector/selector";
export default function MidPartOfScripts() {
  const [items, setItems] = useState([]);
  const intence = useContext(GlobleData);
  const [showPopup, setShowPopup] = useState(false);
  const [itemsDetails, setItemDetails] = useState(null);

  useEffect(() => {
    if (intence.socket) {
      intence.socket.on("scripts", (data) => {
        if (data.items) {
          
          setItems(data.items ?? []);
        }
      });
      intence.socket.on("scriptsItemsPass", (data) => {
        if (data.items) {
          if (data.passRule == "delete") {
            setItems((prev) => [...data.items]);
          } else {
            setItems((prev) => [...prev, data.items]);
          }
        }
      });
      intence.socket.on("openScripts", (data) => {
        setItemDetails({...data.item})
      });
      intence.socket.emit("scripts", { type: "getFiles" });
    }
  }, [intence.socket, itemsDetails]);
  return (
    <div className="w-full relative"
    
    style={{
      height:"calc(100vh - 120px)"
    }}
    >
      
      <PopupFrame active={showPopup}>
        <CreateItemDialog
          Icon={ScriptsIcon}
          onCreate={(value) => {
            if (value.newName.length != 0 && value.newDescrition.length != 0) {
              const findOne = items.find(
                (element) => element.name == value.newName
              );
              if (!findOne) {
                setShowPopup(false);
                if (intence.socket) {
                  intence.socket.emit("scripts", {
                    type: "createItem",
                    name: value.newName,
                    des: value.newDescrition,
                  });
                }
              }
            }
          }}
          onClose={() => {
            setShowPopup(false);
          }}
        />
      </PopupFrame>
      <BodyHeader name="Scripts" />
      <OptionSelector
      itemName={itemsDetails?.name}
        openItem={itemsDetails}
        onCreateItem={() => {
          setShowPopup(true);
        }}
        onCreateSctipts={(newValue) => {
          const newIntence = {
            ...itemsDetails,
            items: [...itemsDetails.items, newValue],
          };
          if (intence.socket) {
            intence.socket.emit("scripts", {
              type: "updateItems",
              updateItems: newIntence,
            });
          }
          
        }}
      />
      {itemsDetails ? (
        <ChatBox
         
          items={itemsDetails?.items ?? []}
          onNewintence={(items) => {
            const newIntence = {
              ...itemsDetails,
              items: [...items],
            };
            if (intence.socket) {
              intence.socket.emit("scripts", {
                type: "updateItems",
                updateItems: newIntence,
              });
            }
          }}
        />
      ) : (
        <DisplayScriptsItems
          items={items}
          onDelete={(value) => {
            if (intence.socket) {
              intence.socket.emit("scripts", {
                type: "deleteFiles",
                name: value.name,
              });
            }
          }}
          onOpen={(value) => {
            if (intence.socket) {
              intence.socket.emit("scripts", { type: "getItems", name: value });
            }
          }}
        />
      )}
    </div>
  );
}
