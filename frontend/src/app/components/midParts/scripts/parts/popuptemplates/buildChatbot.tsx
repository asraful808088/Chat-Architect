import EarlyStoping from "@/app/components/earlyStoping/stoping";
import HiddenlayerBuilder from "@/app/components/hiddenLayersSelector/selector";
import IconWithHeader from "@/app/components/iconWithHeader/iconWithHeader";
import InputWithSelector from "@/app/components/inputWithSelector/inputWithselector";
import PopupFrame, {
  PopupClosebutton,
} from "@/app/components/popUpTools/popupTools";
import GlobleData from "@/app/context/data/globle";
import {
  buildRunningState,
  change_2_errors,
  change_2_hideOptions,
  change_3_errors,
  change_3_info,
  change_ep_value,
  change_stap_1_stage,
  change_stap_1_uniqueItems,
  change_stap_3_stage,
} from "@/app/redux/action/checkInfo";
import BotIcon from "@/assets/logo/bot/bot_6819650.png";
import LogoOfChatBotLearner from "@/assets/logo/learner.png";
import DenseIcon from "@/assets/svg/dense.svg";
import LearningIcon from "@/assets/svg/learning.svg";
import OutputIcon from "@/assets/svg/output.svg";
import StopingIcon from "@/assets/svg/stoping.svg";
import TestIcon from "@/assets/svg/test.svg";
import EphocIcon from "@/assets/svg/wait.svg";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BuildConsole from "./childPopup/displayBuildConsole";
import defaultValueBot, {
  dropoutDefault,
  lstmDefault,
} from "./default/botBuilder";
import { BotBuilderType, LayerType } from "./type/type";
interface ChatBotbuildpoupTemplatesProps {
  itemName: string;
  onClose: any;
}
export default function ChatBotbuildpoupTemplates(
  props: ChatBotbuildpoupTemplatesProps
) {
  const [buildPopup, setBuildpopupStatus] = useState(false);
  const buildRunning = useSelector(
    (state) => state.buildReducer.stapInfo.buildRunning
  );
  const activeBot = useSelector((state) => state.botReducer);

  const listOfBots = useSelector((state) => state.botReducer.listOfBot);
  const dispatchr = useDispatch();
  const [targetBot, setSettargetBot] = useState("");

  const [botSelectionShow, setBotSelectionShow] = useState(false);

  const [profileModel, setProfileModel] = useState({
    default: "default",
    active: null,
    items: ["default"],
  });
  const contextValue = useContext(GlobleData);
  const [options, setOptions] = useState<BotBuilderType>({
    ...defaultValueBot,
  });
  useEffect(() => {
    dispatchr(
      change_ep_value(
        options.epoch.active ? options.epoch.active : options.epoch.default
      )
    );
  }, [options.epoch]);
  useEffect(() => {
    if (profileModel.active != null) {
      contextValue.socket.emit("chatBot_build_profile", {
        type: "get_single",
        name: profileModel.active,
      });
    } else {
      setOptions({ ...defaultValueBot });
    }
  }, [contextValue.socket, profileModel.active]);

  useEffect(() => {
    if (contextValue.socket) {
      contextValue.socket.on("single_model_get", (data) => {
        setOptions({ ...data.model });
      });
      contextValue.socket.on("chatBot_build_profile", (data) => {
        setProfileModel({
          ...profileModel,
          items: ["default", ...data.data],
          default: "default",
        });
      });
      contextValue.socket.emit("chatBot_build_profile", { type: "get" });
    }
  }, [contextValue.socket, profileModel.active]);

  function addItem(item) {}
  function deleteItem(item) {}
  return (
    <div className="w-full relative flex flex-col">
      <PopupFrame active={botSelectionShow}>
        <div
          className={`bg-white relative shadow-2xl rounded-md p-2 w-[900px] h-[600px]`}
        >
          <PopupClosebutton
            onClose={() => {
              setBotSelectionShow(false);
            }}
          />

          <div className="w-[80%] h-[540px] m-auto  relative flex justify-center flex-wrap overflow-y-auto">
            {listOfBots.map((element, index) => {
              if (activeBot.activeBot == element) {
                return;
              }
              return (
                <div
                  key={index}
                  className="relative  h-fit p-5 flex flex-col items-center cursor-pointer"
                  onClick={() => {
                    setSettargetBot(element);
                    setBuildpopupStatus(true);
                    setBotSelectionShow(false);
                    if (!buildRunning) {
                      dispatchr(change_stap_1_stage("N"));
                      if (contextValue.socket) {
                        contextValue.socket.emit("build", {
                          itemName: props.itemName,
                          type: "checkingIntence",
                        });
                      }
                    }
                  }}
                >
                  <div className="h-10 w-10 relative">
                    <Image src={BotIcon} alt="" />
                  </div>
                  <div className="text-xs text-black mx-auto my-4">
                    {element}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </PopupFrame>
      <PopupFrame active={buildPopup}>
        <BuildConsole
          totalEp={
            options.epoch.active ? options.epoch.active : options.epoch.default
          }
          onBuild={(buildWithServer) => {
            if (buildWithServer) {
              contextValue.socket.emit("build", {
                type: "build",
                buildWithServer: true,
                option: options,
                scriptName: props.itemName,
                name: targetBot,
              });
            } else {
              contextValue.socket.emit("build", {
                type: "build",
                buildWithServer: false,
                option: options,
                scriptName: props.itemName,
                name: targetBot,
              });
            }
          }}
          onClose={(tra) => {
            if (typeof tra === "string") {
              if (tra == "closeBuild") {
                contextValue.socket.emit("build", {
                  type: "closeBuild",
                });
                props.onClose();
                setBuildpopupStatus(false);
                return;
              }
            }
            if (!buildRunning) {
              dispatchr(change_stap_1_uniqueItems({}));
              dispatchr(change_2_errors({}));
              dispatchr(change_2_hideOptions(null));
              dispatchr(change_3_errors([]));
              dispatchr(change_3_info([]));
              dispatchr(change_stap_3_stage(""));
              dispatchr(buildRunningState(false));
            }

            if (tra) {
              props.onClose();
            }
            setBuildpopupStatus(false);
          }}
        />
      </PopupFrame>
      <div className="w-full flex  relative h-40">
        <div className="flex flex-col items-center ">
          <div className="w-40 relative">
            <Image src={LogoOfChatBotLearner} alt="no image" />
          </div>
          <div className="text-lg relative">Build-Chatbot</div>
        </div>
        <div className="flex-grow  h-40  w-20 flex items-center justify-end px-2">
          <div className="z-50 mx-8 relative">
            <InputWithSelector
              onChange={(value) => {
                const activeValue = value == "default" ? null : value;
                setProfileModel({
                  ...profileModel,
                  active: profileModel.default != value ? value : null,
                });
              }}
              items={profileModel.items}
              defalutSelector={
                profileModel.active ? profileModel.active : profileModel.default
              }
              inputTypeText={true}
              onAddItems={(value) => {
                contextValue.socket.emit("chatBot_build_profile", {
                  type: "add",
                  name: value,
                  value: defaultValueBot,
                });
              }}
              onDelete={(value) => {
                contextValue.socket.emit("chatBot_build_profile", {
                  type: "delete",
                  name: value,
                });
              }}
              placeholder="create new model"
            />
          </div>
          <div
            className="border mx-2 border-white rounded-md flex justify-center items-center p-2 px-8 hover:scale-[0.98] transition-all  text-black bg-white cursor-pointer text-xs"
            onClick={() => {
              if (buildRunning) {
                setBuildpopupStatus(true);
              } else {
                setBotSelectionShow(true);
              }
            }}
          >
            Build
          </div>
          {profileModel.active != null ? (
            <div
              className="border mx-2 border-white rounded-md flex justify-center items-center p-2 px-8 hover:scale-[0.98] transition-all  text-black bg-white cursor-pointer text-xs"
              onClick={() => {
                contextValue.socket.emit("chatBot_build_profile", {
                  type: "add",
                  name: profileModel.active,
                  value: options,
                });
              }}
            >
              Save profile
            </div>
          ) : null}
        </div>
      </div>
      <div className="overflow-y-auto overflow-x-hidden  w-full  h-[670px] mx-2 flex flex-wrap justify-around z-[611]">
        <div className="mr-8">
          <IconWithHeader Icon={EphocIcon} name="Epochs" />
          <div className="ml-10 flex flex-col z-[611] relative">
            <InputWithSelector
              placeholder="Store Epoch"
              inputTypeInt={true}
              defalutSelector={
                options.epoch.active
                  ? options.epoch.active
                  : options.epoch.default
              }
              items={options.epoch.listOfItems}
              onAddItems={(name) => {
                const find = options.epoch.listOfItems.find(
                  (element, index) => element == name
                );
                if (!find) {
                  const oldData = {
                    ...options,
                    epoch: {
                      ...options.epoch,
                      listOfItems: [name, ...options.epoch.listOfItems],
                    },
                  };
                  setOptions({ ...oldData });
                }
              }}
              onDelete={(e) => {
                if (e) {
                  const newListofitems = options.epoch.listOfItems.filter(
                    (element, index) => element != e
                  );
                  setOptions((prev) => ({
                    ...prev,
                    epoch: {
                      ...options.epoch,
                      listOfItems: newListofitems,
                    },
                  }));
                }
              }}
              onChange={(e) => {
                if (e) {
                  setOptions((prev) => ({
                    ...prev,
                    epoch: {
                      ...options.epoch,
                      active: options.epoch.default != e ? e : null,
                    },
                  }));
                }
              }}
            />
          </div>
        </div>
        <div className="mr-8 z-[511] relative">
          <IconWithHeader Icon={LearningIcon} name="Learning-Rate" />
          <div className="ml-10 flex flex-col z-[511]">
            <InputWithSelector
              defalutSelector={
                options.learningRate.active
                  ? options.learningRate.active
                  : options.learningRate.default
              }
              items={options.learningRate.listOfItems}
              onAddItems={(name) => {
                const find = options.learningRate.listOfItems.find(
                  (element, index) => element == name
                );
                if (!find) {
                  const oldData = {
                    ...options,
                    learningRate: {
                      ...options.learningRate,
                      listOfItems: [name, ...options.learningRate.listOfItems],
                    },
                  };
                  setOptions({ ...oldData });
                }
              }}
              onDelete={(e) => {
                if (e) {
                  const newListofitems =
                    options.learningRate.listOfItems.filter(
                      (element, index) => element != e
                    );
                  setOptions((prev) => ({
                    ...prev,
                    learningRate: {
                      ...options.learningRate,
                      listOfItems: newListofitems,
                    },
                  }));
                }
              }}
              onChange={(e) => {
                if (e) {
                  setOptions((prev) => ({
                    ...prev,
                    learningRate: {
                      ...options.learningRate,
                      active: options.learningRate.default != e ? e : null,
                    },
                  }));
                }
              }}
            />
          </div>
        </div>

        <div className="mr-8 z-[321] relative">
          <IconWithHeader Icon={OutputIcon} name="Output-Dimension" />
          <div className="ml-10 flex flex-col">
            <InputWithSelector
              defalutSelector={
                options.outputDim.active
                  ? options.outputDim.active
                  : options.outputDim.default
              }
              items={options.outputDim.listOfItems}
              onAddItems={(name) => {
                const find = options.outputDim.listOfItems.find(
                  (element, index) => element == name
                );
                if (!find) {
                  const oldData = {
                    ...options,
                    outputDim: {
                      ...options.outputDim,
                      listOfItems: [name, ...options.outputDim.listOfItems],
                    },
                  };
                  setOptions({ ...oldData });
                }
              }}
              onDelete={(e) => {
                if (e) {
                  const newListofitems = options.outputDim.listOfItems.filter(
                    (element, index) => element != e
                  );
                  setOptions((prev) => ({
                    ...prev,
                    outputDim: {
                      ...options.outputDim,
                      listOfItems: newListofitems,
                    },
                  }));
                }
              }}
              onChange={(e) => {
                if (e) {
                  setOptions((prev) => ({
                    ...prev,
                    outputDim: {
                      ...options.outputDim,
                      active: options.outputDim.default != e ? e : null,
                    },
                  }));
                }
              }}
            />
          </div>
        </div>
        <div className="mr-8 z-[131] relative">
          <IconWithHeader Icon={TestIcon} name="Testing-Rate" />
          <div className="ml-10 flex flex-col">
            <InputWithSelector
              defalutSelector={
                options.testingRate.active
                  ? options.testingRate.active
                  : options.testingRate.default
              }
              items={options.testingRate.listOfItems}
              onAddItems={(name) => {
                const find = options.testingRate.listOfItems.find(
                  (element, index) => element == name
                );
                if (!find) {
                  const oldData = {
                    ...options,
                    testingRate: {
                      ...options.testingRate,
                      listOfItems: [name, ...options.testingRate.listOfItems],
                    },
                  };
                  setOptions({ ...oldData });
                }
              }}
              onDelete={(e) => {
                if (e) {
                  const newListofitems = options.testingRate.listOfItems.filter(
                    (element, index) => element != e
                  );
                  setOptions((prev) => ({
                    ...prev,
                    testingRate: {
                      ...options.testingRate,
                      listOfItems: newListofitems,
                    },
                  }));
                }
              }}
              onChange={(e) => {
                if (e) {
                  setOptions((prev) => ({
                    ...prev,
                    testingRate: {
                      ...options.testingRate,
                      active: options.testingRate.default != e ? e : null,
                    },
                  }));
                }
              }}
            />
          </div>
        </div>
        <div className="mr-8 z-[111] relative">
          <IconWithHeader Icon={StopingIcon} name="Early-Stoping" />
          <div className="ml-10 flex flex-col">
            <EarlyStoping
              default_restore_best_weights={
                options.earlyStoping.default.restore_best_weights
              }
              on_restore_best_weights={(value) => {
                setOptions({
                  ...options,
                  earlyStoping: {
                    ...options.earlyStoping,
                    default: {
                      ...options.earlyStoping.default,
                      restore_best_weights: value == "enable",
                    },
                  },
                });
              }}
              defalutValue={options.earlyStoping.enable ? "enable" : "disable"}
              onActivity={(data) => {
                const newData = {
                  ...options,
                  earlyStoping: {
                    ...options.earlyStoping,
                    enable: data == "enable",
                  },
                };
                setOptions({ ...newData });
              }}
              default_min_deltas={
                options.earlyStoping.default.min_delta.active
                  ? options.earlyStoping.default.min_delta.active
                  : options.earlyStoping.default.min_delta.default
              }
              default_patiences={
                options.earlyStoping.default.peti.active
                  ? options.earlyStoping.default.peti.active
                  : options.earlyStoping.default.peti.default
              }
              default_min_deltaItems={
                options.earlyStoping.default.min_delta.listOfItems
              }
              default_patienceItems={
                options.earlyStoping.default.peti.listOfItems
              }
              onChange_min_deltas={(value) => {
                if (value) {
                  setOptions({
                    ...options,
                    earlyStoping: {
                      ...options.earlyStoping,
                      default: {
                        ...options.earlyStoping.default,

                        min_delta: {
                          ...options.earlyStoping.default.min_delta,
                          active:
                            options.earlyStoping.default.min_delta.default !=
                            value
                              ? value
                              : null,
                        },
                      },
                    },
                  });
                }
              }}
              min_deltasAdd={(value) => {
                const oldData = {
                  ...options,
                  earlyStoping: {
                    ...options.earlyStoping,
                    default: {
                      ...options.earlyStoping.default,

                      min_delta: {
                        ...options.earlyStoping.default.min_delta,
                        listOfItems: [
                          ...new Set([
                            value,
                            ...options.earlyStoping.default.min_delta
                              .listOfItems,
                          ]),
                        ],
                      },
                    },
                  },
                };
                setOptions({ ...oldData });
              }}
              min_deltasDelete={(value) => {
                if (value) {
                  const newListofitems =
                    options.earlyStoping.default.min_delta.listOfItems.filter(
                      (element, index) => element != value
                    );
                  setOptions({
                    ...options,
                    earlyStoping: {
                      ...options.earlyStoping,
                      default: {
                        ...options.earlyStoping.default,

                        min_delta: {
                          ...options.earlyStoping.default.min_delta,
                          listOfItems: newListofitems,
                        },
                      },
                    },
                  });
                }
              }}
              onChange_patiences={(value) => {
                if (value) {
                  setOptions({
                    ...options,
                    earlyStoping: {
                      ...options.earlyStoping,
                      default: {
                        ...options.earlyStoping.default,

                        peti: {
                          ...options.earlyStoping.default.peti,
                          active:
                            options.earlyStoping.default.peti.default != value
                              ? value
                              : null,
                        },
                      },
                    },
                  });
                }
              }}
              patienceItemsAdd={(value) => {
                const oldData = {
                  ...options,
                  earlyStoping: {
                    ...options.earlyStoping,
                    default: {
                      ...options.earlyStoping.default,

                      peti: {
                        ...options.earlyStoping.default.peti,
                        listOfItems: [
                          ...new Set([
                            value,
                            ...options.earlyStoping.default.peti.listOfItems,
                          ]),
                        ],
                      },
                    },
                  },
                };
                setOptions({ ...oldData });
              }}
              patienceItemsDelete={(value) => {
                if (value) {
                  const newListofitems =
                    options.earlyStoping.default.peti.listOfItems.filter(
                      (element, index) => element != value
                    );
                  setOptions({
                    ...options,
                    earlyStoping: {
                      ...options.earlyStoping,
                      default: {
                        ...options.earlyStoping.default,

                        peti: {
                          ...options.earlyStoping.default.peti,
                          listOfItems: newListofitems,
                        },
                      },
                    },
                  });
                }
              }}
            />
          </div>
        </div>
        <div className="mr-8 w-full mb-20">
          <IconWithHeader Icon={DenseIcon} name="Hidden-Layers" />
          <div className="ml-10 flex flex-col">
            <HiddenlayerBuilder
              onL1Add={(value) => {
                const layersChange = options.h_layers.map((element, index) => {
                  if (element.id == value.id) {
                    const newData = element.l1.listOfItems;
                    return {
                      ...element,
                      l1: {
                        ...element.l1,
                        listOfItems: [...new Set([value.value, ...newData])],
                      },
                    };
                  }
                  return element;
                });
                setOptions({ ...options, h_layers: layersChange });
              }}
              onL1Delete={(value) => {
                const layersChange = options.h_layers.map((element, index) => {
                  if (element.id == value.id) {
                    const newData = element.l1.listOfItems?.filter(
                      (element) => element != value.value
                    );
                    return {
                      ...element,
                      l1: {
                        ...element.l1,
                        listOfItems: newData,
                      },
                    };
                  }
                  return element;
                });

                setOptions({ ...options, h_layers: layersChange });
              }}
              onL1change={(value) => {
                const layersChange = options.h_layers.map((element, index) => {
                  if (element.id == value.id) {
                    const newData =
                      element.l1.default == value.value ? null : value.value;
                    return {
                      ...element,
                      l1: {
                        ...element.l1,
                        active: newData,
                      },
                    };
                  }
                  return element;
                });
                setOptions({ ...options, h_layers: layersChange });
              }}
              onL2Add={(value) => {
                const layersChange = options.h_layers.map((element, index) => {
                  if (element.id == value.id) {
                    const newData = element.l2.listOfItems;
                    return {
                      ...element,
                      l2: {
                        ...element.l2,
                        listOfItems: [...new Set([value.value, ...newData])],
                      },
                    };
                  }
                  return element;
                });
                setOptions({ ...options, h_layers: layersChange });
              }}
              onL2Delete={(value) => {
                const layersChange = options.h_layers.map((element, index) => {
                  if (element.id == value.id) {
                    const newData = element.l2.listOfItems?.filter(
                      (element) => element != value.value
                    );
                    return {
                      ...element,
                      l2: {
                        ...element.l2,
                        listOfItems: newData,
                      },
                    };
                  }
                  return element;
                });

                setOptions({ ...options, h_layers: layersChange });
              }}
              onL2change={(value) => {
                const layersChange = options.h_layers.map((element, index) => {
                  if (element.id == value.id) {
                    const newData =
                      element.l2.default == value.value ? null : value.value;
                    return {
                      ...element,
                      l2: {
                        ...element.l2,
                        active: newData,
                      },
                    };
                  }
                  return element;
                });
                setOptions({ ...options, h_layers: layersChange });
              }}
              onChangeActivation={(value) => {
                const layersChange = options.h_layers.map((element, index) => {
                  if (element.id == value.id) {
                    return {
                      ...element,
                      activation: value.value,
                    };
                  }
                  return element;
                });
                setOptions({ ...options, h_layers: layersChange });
              }}
              onDropoutAdd={(value) => {
                const layersChange = options.h_layers.map((element, index) => {
                  if (element.id == value.id) {
                    const newData = element.rate.listOfItems;
                    return {
                      ...element,
                      rate: {
                        ...element.rate,
                        listOfItems: [...new Set([value.value, ...newData])],
                      },
                    };
                  }
                  return element;
                });
                setOptions({ ...options, h_layers: layersChange });
              }}
              onDropoutChange={(value) => {
                const layersChange = options.h_layers.map((element, index) => {
                  if (element.id == value.id) {
                    const newData =
                      element.rate.default == value.value ? null : value.value;
                    return {
                      ...element,
                      rate: {
                        ...element.rate,
                        active: newData,
                      },
                    };
                  }
                  return element;
                });
                setOptions({ ...options, h_layers: layersChange });
              }}
              onDropoutDelete={(value) => {
                const layersChange = options.h_layers.map((element, index) => {
                  if (element.id == value.id) {
                    const newData = element.rate.listOfItems?.filter(
                      (element) => element != value.value
                    );
                    return {
                      ...element,
                      rate: {
                        ...element.rate,
                        listOfItems: [...new Set(newData)],
                      },
                    };
                  }
                  return element;
                });

                setOptions({ ...options, h_layers: layersChange });
              }}
              onPersepCount={(value) => {
                const layersChange = options.h_layers.map((element, index) => {
                  if (element.id == value.id) {
                    const newData =
                      element.persep.default == value.value
                        ? null
                        : value.value;
                    return {
                      ...element,
                      persep: {
                        ...element.persep,
                        active: newData,
                      },
                    };
                  }
                  return element;
                });
                setOptions({ ...options, h_layers: layersChange });
              }}
              onPersepCountAdd={(value) => {
                const layersChange = options.h_layers.map((element, index) => {
                  if (element.id == value.id) {
                    const newData = element.persep.listOfItems;
                    return {
                      ...element,
                      persep: {
                        ...element.persep,
                        listOfItems: [
                          ...new Set([value.addPersep, ...newData]),
                        ],
                      },
                    };
                  }
                  return element;
                });

                setOptions({ ...options, h_layers: layersChange });
              }}
              onPersepCountDelete={(value) => {
                const layersChange = options.h_layers.map((element, index) => {
                  if (element.id == value.id) {
                    const newData = element.persep.listOfItems?.filter(
                      (element) => element != value.delPersep
                    );
                    return {
                      ...element,
                      persep: {
                        ...element.persep,
                        listOfItems: newData,
                      },
                    };
                  }
                  return element;
                });

                setOptions({ ...options, h_layers: layersChange });
              }}
              onDeleteItem={(id) => {
                const newLeyars = options.h_layers?.filter(
                  (element, index) => element.id != id
                );

                setOptions({ ...options, h_layers: newLeyars });
              }}
              items={options.h_layers}
              onAdd={(name) => {
                const oldlayer = options.h_layers;
                if (name == LayerType.LSTM) {
                  const newLstm = lstmDefault();
                  const newData = {
                    ...options,
                    h_layers: [...oldlayer, newLstm],
                  };
                  setOptions({ ...newData });
                } else if (name == LayerType.DROPOUT) {
                  const newLstm = dropoutDefault();
                  const newData = {
                    ...options,
                    h_layers: [...oldlayer, newLstm],
                  };
                  setOptions({ ...newData });
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
