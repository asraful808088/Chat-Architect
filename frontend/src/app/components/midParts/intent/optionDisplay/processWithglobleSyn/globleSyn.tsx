import SelectionPad from "@/app/components/selectionPad/selectionPad";
import GlobleData from "@/app/context/data/globle";
import { useContext, useEffect, useState } from "react";
interface ProcessWithGlobleSynProps {
  intence: object;
  changeState: any;
  onNewintence:any
}
export default function ProcessWithGlobleSyn(props: ProcessWithGlobleSynProps) {
  // console.log(props.intence?.PWGS?.items)
  const intence = useContext(GlobleData);
  const [items, setItems] = useState([]);
  const [showSyncSelector, setShowSynSelectore] = useState(false);
  const [temp, setTemp] = useState([]);
  useEffect(() => {
    if (intence.socket) {
      intence.socket.on("collectItems", (data) => {
        if (data?.items) {
          const filterNames = data?.items?.map((element) => element.name);
          setItems(filterNames ?? []);
        }
      });
      intence.socket.emit("synonyms", { type: "get" });
    }
  }, [intence.socket]);
  return (
    <div className="w-full relative text-black flex flex-col ">
      <div className="text-sm relative">Select Globle Synonyms</div>
      <div
        className="text-xs relative my-2 p-2 border border-black w-fit rounded-md cursor-pointer hover:scale-[1.04] transition-all"
        onClick={() => {
          setShowSynSelectore(true);
        }}
      >
        Select Synonyms
      </div>
      <div className="w-fit">
        <SelectionPad
          header={"Synonyms"}
          onclick={(value) => {
            
            if (props.changeState) {
              const newIntence = {...props.intence,PWGS:{...props.intence?.PWGS,items:[...new Set([...props.intence?.PWGS?.items,value])]}}
              props.changeState(newIntence)
              if (props.onNewintence) {
                props.onNewintence(newIntence)
              }
            }
            
            setShowSynSelectore(false);
          }}
          active={showSyncSelector}
          items={items}
          onClose={() => {
            setShowSynSelectore(false);
          }}
        />
      </div>

      <div className="w-full">
        {props.intence?.PWGS?.items.map((element, index) => {
          return (
            <div className="text-xs ml-2 flex items-center my-2" key={index}>
              <div className="text-[10px] relative h-4 w-4 rounded-full border-black border mr-2 flex items-center justify-center">
                {index + 1}
              </div>
              <div className="mr-2 ">{element}</div>
              <div
                className="rotate-45 font-sans text-base cursor-pointer relative flex justify-center items-center"
                onClick={() => {
                  const newItems = props.intence?.PWGS?.items.filter(
                    (element2) => element2 != element
                  );
                  if (props.changeState) {
                    const newIntence = {...props.intence,PWGS:{...props.intence?.PWGS,items:[...new Set(newItems)]}}
                    props.changeState(newIntence)
                    if (props.onNewintence) {
                      props.onNewintence(newIntence)
                    }
                  }
                }}
              >
                +
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
