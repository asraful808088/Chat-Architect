import { useEffect, useState } from "react";
import { Boxdatatype, defaultValueOfBox } from "./boxdataType";
import ContainerwithlineDiv from "./containerItensWithlineDiv/containerItemWithDiv";
interface ContainerBoxProps {
  lineShow: boolean;
  intence: Boxdatatype;
  closeLayer: any;
  onNewintence: any;
  convIndex: Array;
  no: number;
  onDelete: any;
  parentsProperty: object;
  underOfBrackTopic: boolean;
  underOfPrivateTopic: boolean;
}
export default function ContainerBox(props: ContainerBoxProps) {
  const [items, setItems] = useState<Boxdatatype>(
    props.intence ?? defaultValueOfBox()
  );
  useEffect(() => {
    setItems(props.intence ?? defaultValueOfBox());
  }, [props.intence]);
  return (
    <div className="w-fit  relative text-xs text-black ">
      <div className="flex relative  ">
        <ContainerwithlineDiv
          underOfPrivateTopic={props.underOfPrivateTopic}
          underOfBrackTopic={
            props.underOfBrackTopic != true
              ? items.underOf == "break topic"
              : props.underOfBrackTopic
          }
          parentsProperty={props.parentsProperty}
          id={items.id}
          no={props.no ?? 0}
          onNewintence={(newValue) => {
            if (props.onNewintence) {
              setItems({ ...newValue });
              props.onNewintence({ ...newValue });
            } else {
              setItems({ ...newValue });
            }
          }}
          hideAlt={props.intence ? !props.intence.intent : !items.intent}
          hideDefalut={
            items.type == "TTMN"
              ? true
              : items.index == 0
              ? true
              : items.type == "default-conversition"
              ? true
              : items.type == "break topic"
              ? true
              : props.intence
              ? !props.intence.intent
              : !items.intent
          }
          hideNext={
            items.type == "default-conversition"
              ? true
              : props.intence
              ? !props.intence.intent && props.intence.nextConv == null
                ? true
                : props.intence.intent && props.intence.nextConv != null
                ? true
                : false
              : !items.intent && items.nextConv == null
              ? true
              : items.intent && items.nextConv != null
              ? true
              : false
          }
          intence={props.intence ?? items}
          lineDiv={props.lineShow}
          showSingleLine={props.showSingleLine}
          onAlternative={(value) => {
            const storeConvIndexId = [...items.storeConvIndex, items.id];
            if (value) {
              if (value == "new alternative") {
                const nextItem = defaultValueOfBox();

                const newintence = {
                  ...items,
                  alterConv: [
                    ...items.alterConv,
                    {
                      ...nextItem,
                      storeConvIndex: [
                        ...storeConvIndexId.slice(
                          0,
                          storeConvIndexId.length - 1
                        ),
                      ],
                      index: items.index,
                      type: "new alternative",
                      underOf: items.underOf=="break topic"?"break topic":items.type,
                    },
                  ],
                };
                setItems(newintence);
                if (props.onNewintence) {
                  props.onNewintence({ ...newintence });
                }
              } else if (value == "break topic") {
                const nextItem = defaultValueOfBox();
                const newintence = {
                  ...items,
                  alterConv: [
                    ...items.alterConv,
                    {
                      ...nextItem,
                      storeConvIndex: [
                        ...storeConvIndexId.slice(
                          0,
                          storeConvIndexId.length - 1
                        ),
                      ],
                      index: items.index,
                      type: "break topic",
                      intent: "any",
                    },
                  ],
                };
                setItems(newintence);
                if (props.onNewintence) {
                  props.onNewintence({ ...newintence });
                }
              } else if (value != "TTMN") {
                let responseStore = [];
                const findRes = items.preBuildAlternative?.forEach(
                  (element) => {
                    if (element.type.value == value) {
                      element.response?.forEach((element) => {
                        responseStore.push(element);
                      });
                    }
                  }
                );
                const findConditions = items.conditionItems?.items.find(
                  (element) => element.value == value
                );
                const nextItem = defaultValueOfBox();
                const newintence = {
                  ...items,

                  alterConv: [
                    ...items.alterConv,

                    {
                      ...nextItem,
                      storeConvIndex: [
                        ...storeConvIndexId.slice(
                          0,
                          storeConvIndexId.length - 1
                        ),
                      ],
                      index: items.index,
                      responseType: value,
                      response: responseStore,
                      loopActive: findConditions
                        ? findConditions.loopActive
                        : {
                            active: false,
                            returnIndex: {
                              colIndex: "",
                            },
                          },
                      prefixfunc: {
                        name: items.prefixfunc.name,
                        setValue: value,
                      },
                      type: "alternative",
                      intent: items.intent,
                       underOf: items.underOf=="break topic"?"break topic":items.type,
                    },
                  ],
                };
                setItems({ ...newintence });
                if (props.onNewintence) {
                  props.onNewintence({ ...newintence });
                }
              } else {
                const nextItem = defaultValueOfBox();
                const newintence = {
                  ...items,

                  alterConv: [
                    ...items.alterConv,

                    {
                      ...nextItem,
                      storeConvIndex: storeConvIndexId,
                      index: items.index,

                      type: "TTMN", // target to main node
                    },
                  ],
                };
                setItems({ ...newintence });
                if (props.onNewintence) {
                  props.onNewintence({ ...newintence });
                }
              }
            }
          }}
          onCross={() => {
            if (props.closeLayer) {
              props.closeLayer();
            } else {
              if (props.onDelete) {
                props.onDelete({ id: items.id, intent: items.intent });
              }
            }
          }}
          onDefaultAlternative={() => {
            const defaultItem = defaultValueOfBox();

            const storeConvIndexId = [...items.storeConvIndex, items.id];
            const newintence = {
              ...items,
              defaultAlternative: {
                ...defaultItem,
                intent: "private-default",
                storeConvIndex: [
                  ...storeConvIndexId.slice(0, storeConvIndexId.length - 1),
                ],
                index: items.index,
                type: "default-conversition",
                underOf: items.type,
              },
            };
            setItems(newintence);
            if (props.onNewintence) {
              props.onNewintence(newintence);
            }
          }}
          onNext={() => {
            const nextItem = defaultValueOfBox();

            const newintence = {
              ...items,
              nextConv: {
                ...nextItem,
                storeConvIndex: [...items.storeConvIndex, items.id],
                index: items.index + 1,
                type: "next-conversition",
                underOf: items.underOf=="break topic"?"break topic":items.type,
              },
            };
            setItems(newintence);
            if (props.onNewintence) {
              props.onNewintence(newintence);
            }
          }}
        />

        {items.nextConv ? (
          <ContainerBox
            underOfBrackTopic={
              props.underOfBrackTopic != true
                ? items.underOf == "break topic"
                : props.underOfBrackTopic
            }
            onNewintence={(value) => {
              const newIntence = {
                ...items,
                nextConv: value,
              };

              if (props.onNewintence) {
                props.onNewintence(newIntence);
                setItems(newIntence);
              } else {
                setItems(newIntence);
              }
            }}
            lineShow={true}
            intence={items.nextConv}
            closeLayer={() => {
              const newIntence = { ...items, nextConv: null };
              setItems({ ...newIntence });
              if (props.onNewintence) {
                props.onNewintence({ ...newIntence });
              }
            }}
          />
        ) : null}
      </div>

      <div>
        {items.alterConv?.map((element, index) => {
          return (
            <div key={index}>
              <div className="my-10 border-b-2 border-black border-dashed av flex-grow"></div>
              <div className=" relative h-full ml-20">
                <ContainerBox
                  underOfPrivateTopic={
                    props.underOfPrivateTopic ??
                    element.type == "default-conversition"
                  }
                  underOfBrackTopic={
                    props.underOfBrackTopic
                      ? props.underOfBrackTopic
                      : element.type == "break topic"
                      ? true
                      : props.underOfBrackTopic != true
                      ? items.underOf == "break topic"
                      : props.underOfBrackTopic
                  }
                  parentsProperty={items}
                  lineShow={element.index != 0}
                  intence={element}
                  no={index}
                  closeLayer={() => {
                    const modifyListofItems = items.alterConv?.filter(
                      (element2, index) => {
                        return element2.id != element.id;
                      }
                    );
                    const newIntence = {
                      ...items,
                      alterConv: [...modifyListofItems],
                    };
                    setItems({ ...newIntence });
                    if (props.onNewintence) {
                      props.onNewintence({ ...newIntence });
                    }
                  }}
                  onNewintence={(intence) => {
                    const modifyListofItems = items.alterConv?.map(
                      (element, index) => {
                        if (element.id == intence.id) {
                          return intence;
                        }
                        return element;
                      }
                    );

                    const newIntence = {
                      ...items,
                      alterConv: modifyListofItems,
                    };
                    setItems({ ...newIntence });
                    if (props.onNewintence) {
                      props.onNewintence({ ...newIntence });
                      setItems({ ...newIntence });
                    }
                  }}
                />
              </div>
            </div>
          );
        })}

        {items.defaultAlternative ? (
          <div>
            <div className="my-10 border-b-2 border-black border-dashed av flex-grow"></div>
            <div className=" relative h-full ml-20">
              <ContainerBox
                underOfPrivateTopic={props.underOfPrivateTopic ?? true}
                underOfBrackTopic={props.underOfBrackTopic}
                parentsProperty={items}
                lineShow={true}
                intence={items.defaultAlternative}
                closeLayer={() => {
                  const newIntence = {
                    ...items,
                    defaultAlternative: null,
                  };
                  setItems(newIntence);
                  if (props.onNewintence) {
                    props.onNewintence(newIntence);
                    setItems(newIntence);
                  }
                }}
                onNewintence={(intence) => {
                  const newIntence = {
                    ...items,
                    defaultAlternative: intence,
                  };
                  setItems(newIntence);
                  if (props.onNewintence) {
                    props.onNewintence(newIntence);
                  }
                }}
              />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
