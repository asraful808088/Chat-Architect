import ItemsSelector from "@/app/components/itemsSeector/selector";
import OptionSelector from "@/app/components/option/option";
import { useState } from "react";
import ItemIndicator from "../itemIndicator/items";
interface ResponseContainerProps {
  header: string;
  optionsResponse: Array;
  index: number;
  responseList: Array;
  onAdd: any;
  onDelete: any;
  onLoopActive: any;
  loopStatus: boolean;
  hideAdd: boolean;
  conVlist: Array;
  intence: object;
  hideCross: boolean;
  onChangeColumnId: any;
  defaultColumnId: string;
  underOfBrackTopic:boolean
  underOfPrivateTopic: boolean;

}
export default function ResponseContainer(props: ResponseContainerProps) {
  const [showOptions, setShowOptions] = useState(false);
  function getLoopOptions(){
    let options = ["none"]
    if (props.intence.type == "break topic" || props.underOfBrackTopic || props.intence.underOf == "break topic" ) {
      options.push("any")
    }
    options = [...options,...props?.intence?.storeConvIndex]
    return options
  }
  return (
    <div className="my-5">
      <div className="w-full">{props.header ?? "default"}</div>
      <div className="ml-1">
        <div className="my-2">
          response :{" "}
          {!props.hideAdd && props.intence.alterConv.length == 0 ? (
            props?.intence?.type != "alternative" ? (
              <span
                className="cursor-pointer"
                onClick={() => {
                  if (props.onAdd) {
                    props.onAdd();
                  }
                }}
              >
                add
              </span>
            ) : null
          ) : null}
        </div>
        {props?.responseList?.map((element, index) => {
          return (
            <ItemIndicator
              hideCross={props.hideCross}
              name={element}
              lineActive={true}
              key={index}
              onDelete={() => {
                if (props.onDelete) {
                  props.onDelete(element);
                }
              }}
            />
          );
        })}
      </div>

      {!(props.index ==  0 || props.underOfPrivateTopic) ? (
       (
          <>
            <OptionSelector
              onChange={(value) => {
                if (props.intence.alterConv.length == 0) {
                  if (props.onLoopActive) {
                    if (props?.intence?.type != "alternative") {
                      props.onLoopActive(value);
                    }
                  }
                }
              }}
              hideHeader={true}
              items={[
                { name: "loop active", checked: props.loopStatus ?? false },
              ]}
            />
            {props.loopStatus ? (
              <div className="w-full ">
                <div className="  w-full ">
                  <div>column:</div>

                  <div className=" w-full pr-4 relative z-50">
                    <ItemsSelector
                      blackBorder={true}
                      closeSignOff={true}
                      onChange={(value) => {
                        if (props.onChangeColumnId) {
                          props.onChangeColumnId(value!="none"?value:"");
                        }
                      }}
                      items={
                        props?.intence?.storeConvIndex
                          ? getLoopOptions()
                          : []
                      }
                      defaultValue={
                        props.defaultColumnId == ""
                          ? null
                          : props.defaultColumnId
                      }
                    />
                  </div>
                </div>
              </div>
            ) : null}
          </>
        )
      ) : null}
    </div>
  );
}
