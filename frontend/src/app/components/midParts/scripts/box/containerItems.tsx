import OptionSelector from "@/app/components/option/option";
import PopupFrame from "@/app/components/popUpTools/popupTools";
import SelectionPad from "@/app/components/selectionPad/selectionPad";
import GlobleData from "@/app/context/data/globle";
import AlternativeIcon from "@/assets/svg/alternative.svg";
import CrossIcon from "@/assets/svg/close.svg";
import NextIcon from "@/assets/svg/next.svg";
import DefaultAlternativeIcon from "@/assets/svg/otherOption.svg";
import { useContext, useEffect, useState } from "react";
import { Boxdatatype } from "./boxdataType";
import IconButton from "./iconButton/button";
import ItemIndicator from "./itemIndicator/items";
import PopupTemplates from "./popupTemplates/templates";
import ResponseContainer from "./responseContainer/responseContainer";
import InfoIcon from "@/assets/svg/352432_info_icon.svg";
import { PopupClosebutton } from "@/app/components/popUpTools/popupTools";

interface ContainerItensProps {
  onAlternative: any;
  onDefaultAlternative: any;
  onNext: any;
  onCross: any;
  intence: Boxdatatype;
  hideClose: boolean;
  hideNext: boolean;
  hideAlt: boolean;
  hideDefalut: boolean;
  onNewintence: any;
  onNextIntence: any;
  convIndex: Array;
  no: number;
  onConvIndex: any;
  id: string;
  parentsProperty:object
  underOfBrackTopic:boolean
  underOfPrivateTopic: boolean;
}
export default function ContainerItens(props: ContainerItensProps) {
  const globleData = useContext(GlobleData);
  const [showOptions, setShowOptions] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showAlartPopup, setshowAlartPopup] = useState(false);
  const [popupOption, setPopupOption] = useState({
    type: null,
    for: null,
  });
  const [conditionItems, setConditionItems] = useState({
    items: [],
    setValue: "",
  });
  const [responseStore, setResponseStore] = useState({
    default: [],
    conditionalRes: [],
  });

  useEffect(() => {
    if (globleData.socket && props.intence?.prefixfunc) {
      globleData.socket?.on("search", (data) => {
        if (data.type!="condition") {
          return 
        }
        if (data.items?.length != 0) {
          const findConditionItems = data.items?.find(
            (element) => element.name == props.intence?.prefixfunc?.name
          );
          setConditionItems({
            items: findConditionItems.items?.multiType,
            setValue: findConditionItems.items?.setValue,
          });
        }
      });
      globleData.socket.emit("search", {
        type: "condition",
        value: props.intence?.prefixfunc?.name,
      });
    }
  }, [globleData.socket, props.intence]);
  const process = (index, func) => {
    const isExsistBreaktopic = props.intence.alterConv?.find(
      (element) => element.type == "break topic"
    );
    const list = [...conditionItems.items];
    const listofConditionItems = props.intence.alterConv?.map(
      (element, index) => element.responseType
    );
    let processList = list?.filter(
      (element, index) => !listofConditionItems.includes(element)
    );
    processList = processList?.filter(
      (element, index) => element != props.intence.responseType
    );
    if (!(props?.intence?.type == "new alternative" || props?.intence?.type == "default-conversition"|| props?.intence?.type == "break topic") ) {
      if (index != 0) {
        processList.push("new alternative");
        if (!isExsistBreaktopic) {
          processList.push("break topic");
        }
      }
    }
    if (props.underOfBrackTopic) {
      processList = processList?.filter(
        (element, index) => element != "break topic"
      );
    }
    // const  checkprocessList = processList?.find(
    //   (element, index) => element == "TTMN"
    // )
    // const isExsistTTMN = props.intence.alterConv?.find(
    //   (element) => element.type == "TTMN"
    // );
    // if ((props?.intence?.type == "next-conversition" || props?.intence?.type == "new alternative")&& !isExsistTTMN) {
    //   processList.push("TTMN");
    // }
    if (processList.length != 0) {
      return (
        <SelectionPad
          onclick={(value) => {
            setShowOptions(false);
            if (props.onAlternative) {
              props.onAlternative(value);
            }
          }}
          header={"select alternative"}
          active={showOptions}
          items={processList ?? []}
          onClose={() => {
            setShowOptions(false);
          }}
        />
      );
    }
  };
  return (
    <div className="rounded-md border border-black p-1 px-2 h-fit  relative w-auto">
       <PopupFrame active={showAlartPopup}>
        <div className="w-[600px]  bg-slate-100 rounded-md shadow-2xl p-3">
          <PopupClosebutton
            onClose={() => {
              
              setshowAlartPopup(false);
            }}
          />
          <div className="w-full flex justify-center items-center">
            <div className="h-10 w-10 relative mx-2">
              <InfoIcon />
            </div>
            <div className="text-xl mx-2 text-black">Necessary Alert</div>
          </div>
          <div className="my-4 mb-20 relative text-black text-center">
            Attempted to use the same intent multiple times. Please ensure each
            intent is only utilized once for optimal functionality.
          </div>
        </div>
      </PopupFrame>
      <PopupFrame active={showPopup}>
        <PopupTemplates
          onClose={() => setShowPopup(false)}
          option={popupOption}
          onCallback={(value) => {
            
            if (value.type == "intent") {
              const allIntent = []
              if (props.parentsProperty && props.parentsProperty?.intent) {
                allIntent.push(props.parentsProperty?.intent)
                props.parentsProperty?.alterConv?.forEach(element => {
                  allIntent.push(element.intent)
                });
              }

              if (props.parentsProperty && props.parentsProperty?.defaultAlternative) {
                
                allIntent.push(props.parentsProperty?.defaultAlternative.intent)
              }

              if (allIntent.includes(value.item)) {
                setshowAlartPopup(true);

                return;
              }
              

              if (props.onNewintence) {
                const newIntence = props.intence;

                props.onNewintence({ ...newIntence, intent: value.item });
                
              }
            } else if (value.type == "condition") {
              if (props.onNewintence) {
                const newIntence = props.intence;
                const itemsValue =
                  value.options?.multiType?.length != 0
                    ? value.options?.multiType
                    : value.options.binaryType;

                const addLoopActivity = itemsValue?.map((element) => {
                  return {
                    value: element,
                    loopActive: {
                      active: false,
                      returnIndex: {
                        colIndex: "",
                      },
                    },
                  };
                });
                const preSetValue = value.options.setValue;
                const process = {
                  ...newIntence,
                  responseType: null,
                  response: [],
                  alterConv: [],
                  nextConv: null,
                  responseType: value.options.setValue,
                  prefixfunc: {
                    name: value.item,
                    items: itemsValue,
                    setValue: preSetValue,
                  },
                  conditionItems: {
                    items: addLoopActivity,
                    setValue: preSetValue,
                  },
                };
                props.onNewintence(process);
                setConditionItems({ items: itemsValue, setValue: preSetValue });
                
              }
            } else if (value.type == "res_action") {
              
              if (value.for == "default") {
               
                const newIntence = props.intence;

                const process = {
                  ...newIntence,
                  responseType: value.for,

                  response: [...newIntence.response, value.item],
                };
                if (props.onNewintence) {
                  props.onNewintence(process,{id:props.intence.id,response:value.item,type:"response",for:value.for});
                }
              } else {
                const newIntence = props.intence;
                
                let buildNewArray = newIntence?.preBuildAlternative;
                const find = newIntence?.preBuildAlternative?.find(
                  (element) => {
                    return element.type == value.for;
                  }
                );


               



                if (find) {
                  
                  const newArray = buildNewArray?.map((element) => {
                    if (element.type == value.for) {
                      const responseList = element.response;
                      return {
                        type: value.for,
                        response: [...responseList, value.item],
                      };
                    }
                    return element;
                  });
                  buildNewArray = newArray;
                } else {
                 
                  buildNewArray = [
                    ...buildNewArray,
                    { type: value.for, response: [value.item] },
                  ];
                }

                const process = {
                  ...newIntence,
                  preBuildAlternative: [...buildNewArray],
                };
                if (props.onNewintence) {
                  props.onNewintence(process,{id:props.intence.id,response:value.item,type:"response",for:value.for?.value});
                }
              }
            }
          }}
        />
      </PopupFrame>

      <div className="w-full flex justify-around">
        {props?.intence?.type == "alternative" ? null : props?.intence
            ?.defaultAlternative != null ? null : (
          <>
            {!props.hideAlt ? (
              <IconButton
                Icon={AlternativeIcon}
                onClick={(name) => {
                  if (props.intence?.prefixfunc) {
                    setShowOptions(true);
                  } else {
                    if (props.intence.index != 0) {
                      setShowOptions(true);
                    }
                  }
                }}
              />
            ) : null}
            {!props.hideDefalut ? (
              <IconButton
                Icon={DefaultAlternativeIcon}
                onClick={(name) => {
                  if (props.onDefaultAlternative) {
                    props.onDefaultAlternative();
                  }
                }}
              />
            ) : null}
          </>
        )}
        { !(props.hideNext || props.underOfPrivateTopic)  ? (
          <IconButton
            Icon={NextIcon}
            onClick={(name) => {
              if (props.onNext) {
                props.onNext();
              }
            }}
          />
        ) : null}

        {!props.hideClose ? (
          <IconButton
            Icon={CrossIcon}
            onClick={(name) => {
              if (props.onCross) {
                props.onCross();
              }
            }}
          />
        ) : null}
      </div>

      {process(props.intence.index)}

      <div className="w-44 my-2">id : {props?.intence?.id ?? 0}</div>
      <div className="w-full my-2">index : {props?.intence?.index ?? 0}</div>
      <div className="w-full my-2">type : {props?.intence?.type ?? "init"}</div>

      {props.intence?.index == undefined ? null : props.intence?.index != 0 ? (
        <OptionSelector
          onChange={(value) => {
            const newIntence = { ...props.intence, sequence: !value.checked };
            if (props.onNewintence) {
              props.onNewintence(newIntence);
            }
          }}
          hideHeader={true}
          items={[{ name: "sequence", checked: props.intence?.sequence }]}
        />
      ) : null}

      <div className="my-2">
        intent :{" "}
        {props?.intence?.type == "default-conversition" ? null : props?.intence?.type == "alternative" ? null : props?.intence?.type ==
          "break topic" ? null : (
          <span
            className="cursor-pointer"
            onClick={() => {
              setShowPopup(true);
              setPopupOption((prev) => ({ ...prev, type: "intent" }));
            }}
          >
            add
          </span>
        )}
      </div>

      {props?.intence?.intent ? (
        <ItemIndicator
          hideCross={
            (props?.intence?.type == "alternative" ||  props?.intence?.type == "default-conversition")
              ? true
              : props?.intence?.type == "break topic"
              ? true
              : false
          }
          onDelete={(name) => {
            if (props.onNewintence) {
              const newIntence = props.intence;

              props.onNewintence({
                ...newIntence,
                intent: null,
                nextConv: null,
                alterConv: [],
              });
            }
          }}
          name={props?.intence?.intent ?? "unset"}
          lineActive={true}
        />
      ) : null}
      <div className="my-2 cursor-pointer">
        funciton :{" "}
        {(props?.intence?.type != "alternative") ? (
          <span
            className="cursor-pointer"
            onClick={() => {
              setShowPopup(true);
              setPopupOption((prev) => ({ ...prev, type: "condition" }));
            }}
          >
            add
          </span>
        ) : null}
      </div>
      {props.intence.prefixfunc ? (
        <ItemIndicator
          hideCross={props?.intence?.type == "alternative"  }
          name={props?.intence?.prefixfunc?.name}
          lineActive={true}
          onDelete={() => {
            if (props.onNewintence) {
             
              const newIntence = props.intence;
              setConditionItems({ items: [], setValue: null });
              props.onNewintence({
                ...newIntence,
                alterConv: [],
                prefixfunc: null,
                preBuildAlternative: [],
                conditionItems: { items: [], setValue: "" },
                responseType: null,
                loopActive: {
                  active: false,
                  returnIndex: {
                    colIndex: "",
                  },
                },
              });
            }
          }}
        />
      ) : null}
      {props?.intence?.type == "alternative" ? (
        <div className="ml-10">
          <ItemIndicator
            lineActive={true}
            name={props?.intence?.responseType}
            hideCross={true}
          />
        </div>
      ) : null}

      {props.intence?.conditionItems?.items?.length != 0 &&
      props?.intence?.type != "alternative" ? (
        props.intence?.conditionItems?.items?.map((element, index) => {
          const objFind = props.intence?.preBuildAlternative.find(
            (element2) => element2.type == element
          );
            const responseStore = props.intence?.preBuildAlternative?.map((element2)=>{
              if (element.value == element2.type.value) {
                return element2.response[0]
              }
              return null
            }) 
            const responseFilterWithOutNull =  responseStore?.filter(element=>element!=null)
            let restoreResponse;
            restoreResponse = responseFilterWithOutNull
          return (
            <ResponseContainer
            underOfPrivateTopic={props.underOfPrivateTopic}
              defaultColumnId={element?.loopActive?.returnIndex?.colIndex}
              onChangeColumnId={(value) => {
                const findValue = props.intence?.conditionItems?.items?.find(
                  (element2) => element2.value == element.value
                );
                const newValue = {
                  ...findValue,
                  value: findValue.value,
                  loopActive: {
                    ...findValue.loopActive,
                    returnIndex: {
                      ...findValue.loopActive.returnIndex,
                      colIndex: value,
                    },
                  },
                };
                const newItems = props.intence?.conditionItems?.items?.map(
                  (element2) => {
                    if (element2.value == element.value) {
                      return newValue;
                    }

                    return element2;
                  }
                );
                const newIntence = {
                  ...props.intence,
                  conditionItems: {
                    ...props.intence?.conditionItems,
                    items: newItems,
                  },
                };
                if (props.onNewintence) {
                  props.onNewintence(newIntence);
                }
              }}
              hideCross={
                props?.intence?.type == "alternative" ||
                props?.intence?.alterConv.length != 0
              }
              intence={props.intence}
              loopStatus={element?.loopActive.active == true}
              onLoopActive={(value) => {
                const intenceCondition = props.intence.conditionItems?.items;
                const newConditions = intenceCondition?.map(
                  (element2, index) => {
                    if (element2.value == element.value) {
                      const targetValue = {
                        ...element2,
                        loopActive: {
                          ...element2.loopActive,
                          active: !value.checked,
                        },
                      };
                      return targetValue;
                    }
                    return element2;
                  }
                );
                if (props.onNewintence) {
                  props.onNewintence({
                    ...props.intence,
                    conditionItems: {
                      ...props.intence.conditionItems,
                      items: newConditions,
                    },
                  });
                }
              }}
              responseList={restoreResponse}
              index={props.intence?.index ?? 0}
              key={index}
              header={`alternative : ${element.value} ${
                props.intence?.responseType == element.value ? "<-main" : ""
              }`}
              onDelete={(item) => {
                props.intence;
                const oldValue = props?.intence?.preBuildAlternative;

                const optionRsValue = oldValue?.find(
                  (eleemnt2, index) => eleemnt2.type?.value == element.value
                );
                const response = optionRsValue.response?.filter(
                  (element) => element != item
                );
                const newObject = { ...optionRsValue, response };
                const removeoldItems = oldValue?.filter((eleemnt2, index) => {
                  return eleemnt2?.type?.value != element.value;
                });
                const newIntence = {
                  ...props.intence,
                  preBuildAlternative: [...removeoldItems, newObject],
                  responseType: props.intence?.responseType,
                };
                if (props.onNewintence) {
                  props.onNewintence(newIntence);
                }
              }}
              onAdd={() => {
                setPopupOption({
                  type: "res_action",
                  for: element,
                });
                setShowPopup(true);
              }}
            />
          );
        })
      ) : (
        <ResponseContainer
        underOfPrivateTopic={props.underOfPrivateTopic}
        underOfBrackTopic={props.underOfBrackTopic}
          defaultColumnId={
            props.intence?.loopActive?.returnIndex?.colIndex ?? ""
          }
          onChangeColumnId={(value) => {
            const newIntence = {
              ...props.intence,
              loopActive: {
                active: true,
                returnIndex: {
                  colIndex: value,
                },
              },
            };
            if (props.onNewintence) {
              props.onNewintence(newIntence);
            }
          }}
          hideCross={props?.intence?.type == "alternative"}
          intence={props.intence}
          hideAdd={props?.intence?.type == "alternative"}
          onLoopActive={(value) => {
            const newIntence = {
              ...props.intence,
              loopActive: {
                ...props.intence.loopActive,
                active: !value.checked,
              },
            };
            if (props.onNewintence) {
              props.onNewintence(newIntence);
            }
          }}
          loopStatus={props.intence?.loopActive?.active}
          index={props.intence?.index ?? 0}
          responseList={
            props.intence?.response ? [...props.intence?.response] : []
          }
          onDelete={(name) => {
            const newIntence = props.intence;
            const newRes = newIntence.response?.filter(
              (element, index) => element != name
            );
            const process = {
              ...newIntence,
              response: newRes,
            };
            if (props.onNewintence) {
              props.onNewintence(process);
              
            }
          }}
          header="default"
          onAdd={() => {
            setPopupOption({
              type: "res_action",
              for: "default",
            });
            setShowPopup(true);
          }}
        />
      )}
    </div>
  );
}
