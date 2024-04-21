import GlobleData from "@/app/context/data/globle";
import ResponseIcon from "@/assets/svg/response.svg";
import { useContext, useEffect, useState } from "react";
import { uuid } from "uuidv4";
import BodyHeader from "../../bodyHeader/header";
import CreateItemDialog from "../../create_items_dialog/create_items";
import PopupFrame from "../../popUpTools/popupTools";
import DisplayItems from "../scripts/displayScripts/display";
import OptionSelector from "../scripts/parts/buttonHandlers";
import ResponseCard from "./responseCard/responseCard";
interface ResponseProps {}
export default function Response(props: ResponseProps) {
  const allIntence = useContext(GlobleData);
  const [items, setItems] = useState([]);
  const [itemDetails, setItemDetails] = useState(null);
  const [popupActive, setPopupActive] = useState(false);
  useEffect(() => {
    if (allIntence.socket) {
      allIntence.socket.on("collect", (data) => {
        setItems(data.items);
      });
      allIntence.socket.on("itemDetails", (data) => {
        setItemDetails(data.item);
      });
      allIntence.socket.emit("response", {
        type: "getItems",
      });
    }
  }, [allIntence.socket]);
  return (
    <div
      className="w-full overflow-y-auto"
      style={{
        height: "calc(100vh - 120px)",
      }}
    >
      <PopupFrame active={popupActive}>
        <CreateItemDialog
          Icon={ResponseIcon}
          onCreate={(value) => {
            if (value.newName && value.newDescrition && allIntence.socket) {
              allIntence.socket.emit("response", {
                type: "create",
                ...value,
              });
            }
          }}
          onClose={() => {
            setPopupActive(false);
          }}
        />
      </PopupFrame>
      <BodyHeader name="Response" />
      <OptionSelector
        onCreateItem={() => {
          if (itemDetails) {
            setItemDetails({
              ...itemDetails,
              items: [...itemDetails.items, { id: uuid(), items: [] }],
            });
          } else {
            setPopupActive(true);
          }
        }}
      />
      {!itemDetails ? (
        <DisplayItems
          onOpen={(value) => {
            if (allIntence.socket) {
              allIntence.socket.emit("response", {
                type: "getDetails",
                name: value,
              });
            }
          }}
          onDelete={(value) => {
            if (allIntence.socket) {
              allIntence.socket.emit("response", {
                type: "delete",
                name: value.name,
              });
            }
          }}
          items={items}
        />
      ) : (
        <Details
          items={itemDetails.items}
          name={itemDetails.name}
          newIntence={(value) => {
            const updateIntence = { ...itemDetails, items: value };
            setItemDetails(updateIntence);
            if (allIntence.socket) {
              allIntence.socket.emit("response", {
                type: "update",
                obj: updateIntence,
              });
            }
          }}
        />
      )}
    </div>
  );
}

interface DetailsProps {
  items: Array;
  newIntence: any;
  name: string;
}
function Details(props: DetailsProps) {
  const [items, setItems] = useState([]);
  useEffect(() => {
    setItems(props.items ?? []);
  }, [props.items]);
  return (
    <div className="w-full relative h-full  flex justify-around flex-wrap">
      {items.map((element, index) => {
        return (
          <ResponseCard
            onDelete={() => {
              const newItems = items.filter(
                (element2) => element2.id != element.id
              );
              if (props.newIntence) {
                props.newIntence(newItems);
              }
            }}
            items={element.items}
            onNewintence={(value) => {
              const newItems = items.map((element2) => {
                if (element.id == element2.id) {
                  return {
                    ...element2,
                    items: value,
                  };
                }
                return element2;
              });

              if (props.newIntence) {
                props.newIntence(newItems);
              }
            }}
            key={index}
          />
        );
      })}
    </div>
  );
}
