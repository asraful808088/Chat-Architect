import Option from "@/app/components/option/option";
import { useState } from "react";
interface FussyWrongOptionProps {
  header: string;
  startTh: number;
  endTh: number;
  fussyWrongMode: boolean;
  fewWrongMode: boolean;
  intentce: object;
  changeState: any;
  onNewintence:any
}
export default function FussyWrongOption(props: FussyWrongOptionProps) {
  const [options, setOptions] = useState({
    generateQuantity: 100,
    tryToGenerateQuantity: 50000,
    startTh: 0.83,
    endTh: 0.9,
    simpleWrongTh: 0.92,
    fullWrongTh: 0.75,
  });
  return (
    <div className="w-full relative h-[90%]">
      <div className="w-full relative  text-black  overflow-y-auto">
        <div className="w-full ">
          {props.header ?? "Wrong Generate"} - Option{" "}
        </div>
        <div className="w-auto ml-2 text-sm my-5">
          Generate quantity <span className="font-mono font-extrabold">-</span>{" "}
          <input
            type="number"
            value={
              props.fussyWrongMode
                ? props.intentce.FWG.generateQuantity
                : props.fewWrongMode
                ? props.intentce.WGFA.generateQuantity
                : props.intentce.FLWG.generateQuantity
            }
            className="w-fit outline-none border-none"
            onChange={(e) => {
              let newIntence = {};
              if (props.fussyWrongMode) {
                newIntence = {
                  ...props.intentce,
                  FWG: {
                    ...props.intentce.FWG,
                    generateQuantity: e.target.value,
                  },
                };
              } else if (props.fewWrongMode) {
                newIntence = {
                  ...props.intentce,
                  WGFA: {
                    ...props.intentce.WGFA,
                    generateQuantity: e.target.value,
                  },
                };
              } else {
                newIntence = {
                  ...props.intentce,
                  FLWG: {
                    ...props.intentce.FLWG,
                    generateQuantity: e.target.value,
                  },
                };
              }
              if (props.changeState) {
                props.changeState(newIntence);
                if (props.onNewintence) {
                  props.onNewintence(newIntence)
                }
              }
            }}
          />
        </div>
        <div className="w-auto ml-2 text-sm my-5">
          Try to generate quantity{" "}
          <span className="font-mono font-extrabold">-</span>{" "}
          <input
            type="number"
            name=""
            value={
              props.fussyWrongMode
                ? props.intentce.FWG.tryToGenerateQuantity
                : props.fewWrongMode
                ? props.intentce.WGFA.tryToGenerateQuantity
                : props.intentce.FLWG.tryToGenerateQuantity
            }
            id=""
            className="w-fit outline-none border-none"
            onChange={(e) => {
              let newIntence = {};
              if (props.fussyWrongMode) {
                newIntence = {
                  ...props.intentce,
                  FWG: {
                    ...props.intentce.FWG,
                    tryToGenerateQuantity: e.target.value,
                  },
                };
              } else if (props.fewWrongMode) {
                newIntence = {
                  ...props.intentce,
                  WGFA: {
                    ...props.intentce.WGFA,
                    tryToGenerateQuantity: e.target.value,
                  },
                };
              } else {
                newIntence = {
                  ...props.intentce,
                  FLWG: {
                    ...props.intentce.FLWG,
                    tryToGenerateQuantity: e.target.value,
                  },
                };
              }
              if (props.changeState) {
                props.changeState(newIntence);
                if (props.onNewintence) {
                  props.onNewintence(newIntence)
                }
              }
            }}
          />
        </div>
        {!props.fewWrongMode ? (
          <div className="w-auto ml-2 text-sm my-5">
            {props.fussyWrongMode ? "Simple" : "Full"} wrong threshold{" "}
            <span className="font-mono font-extrabold">-</span>{" "}
            <input
              type="number"
              name=""
              value={
                props.fussyWrongMode
                  ? props.intentce.FWG.WrongThreshold
                  : props.intentce.FLWG.WrongThreshold
              }
              min={0}
              max={1}
              id=""
              className="w-20 outline-none border-none"
              onChange={(e) => {
                let processValue =
                  e.target.value < 0
                    ? 0
                    : e.target.value > 1
                    ? 1
                    : e.target.value;
                if (!processValue) {
                  if (props.fussyWrongMode) {
                    processValue =
                      props.intentce.WGFA.endWrongThreshold + 0.00001;
                  } else {
                    processValue =
                      props.intentce.WGFA.startWrongThreshold - 0.0001;
                  }
                } else {
                  if (props.fussyWrongMode) {
                    processValue =
                      props.intentce.WGFA.endWrongThreshold > processValue
                        ? props.intentce.WGFA.endWrongThreshold + 0.00001
                        : processValue;
                  } else {
                    processValue =
                      props.intentce.WGFA.startWrongThreshold < processValue
                        ? props.intentce.WGFA.startWrongThreshold - 0.00001
                        : processValue;
                  }
                }
                let newIntence = {};
                if (props.fussyWrongMode) {
                  newIntence = {
                    ...props.intentce,
                    FWG: {
                      ...props.intentce.FWG,
                      WrongThreshold: processValue ?? 0,
                    },
                  };
                } else {
                  newIntence = {
                    ...props.intentce,
                    FLWG: {
                      ...props.intentce.FLWG,
                      WrongThreshold: processValue ?? 0,
                    },
                  };
                }
                if (props.changeState) {
                  props.changeState(newIntence);
                  if (props.onNewintence) {
                    props.onNewintence(newIntence)
                  }
                }
              }}
            />
          </div>
        ) : null}
        {props.fewWrongMode ? (
          <div className=" w-auto ml-2 text-sm my-5 flex">
            Confusion threshold{" "}
            <span className="font-mono font-extrabold">-</span>{" "}
            <span className="font-mono font-extrabold mx-2">startTh</span>{" "}
            <div className="w-auto bg-gray-400">
              <input
                type="number"
                name=""
                value={props.intentce.WGFA.startWrongThreshold}
                id=""
                className="w-fit outline-none border-none"
                onChange={(e) => {
                  let processValue =
                    e.target.value < 0
                      ? 0
                      : e.target.value > 1
                      ? 1
                      : e.target.value;

                  if (!processValue) {
                    processValue = props.intentce.FLWG.WrongThreshold + 0.00001;
                  } else {
                    processValue =
                      props.intentce.FLWG.WrongThreshold < processValue &&
                      props.intentce.WGFA.endWrongThreshold > processValue
                        ? processValue
                        : props.intentce.FLWG.WrongThreshold > processValue
                        ? props.intentce.FLWG.WrongThreshold + 0.0001
                        : props.intentce.WGFA.endWrongThreshold - 0.001;
                  }

                  let newIntence = {};
                  newIntence = {
                    ...props.intentce,
                    WGFA: {
                      ...props.intentce.WGFA,
                      startWrongThreshold: processValue ?? 0,
                    },
                  };
                  if (props.changeState) {
                    props.changeState(newIntence);
                    if (props.onNewintence) {
                      props.onNewintence(newIntence)
                    }
                  }
                }}
              />
            </div>
            <span className="font-mono font-extrabold">-</span>{" "}
            <span className="font-mono font-extrabold mx-2">endTh</span>{" "}
            <div className="w-auto bg-gray-400">
              <input
                type="number"
                name=""
                value={props.intentce.WGFA.endWrongThreshold}
                id=""
                className="w-fit outline-none border-none"
                onChange={(e) => {
                  let processValue =
                    e.target.value < 0
                      ? 0
                      : e.target.value > 1
                      ? 1
                      : e.target.value;
                  if (!processValue) {
                    processValue =
                      props.intentce.WGFA.startWrongThreshold + 0.00001;
                  } else {
                    processValue =
                      props.intentce.WGFA.startWrongThreshold < processValue &&
                      props.intentce.FWG.WrongThreshold > processValue
                        ? processValue
                        : props.intentce.WGFA.startWrongThreshold > processValue
                        ? props.intentce.WGFA.startWrongThreshold + 0.0001
                        : props.intentce.FWG.WrongThreshold - 0.001;
                  }
                  let newIntence = {};
                  newIntence = {
                    ...props.intentce,
                    WGFA: {
                      ...props.intentce.WGFA,
                      endWrongThreshold: processValue ?? 0,
                    },
                  };
                  if (props.changeState) {
                    props.changeState(newIntence);
                    if (props.onNewintence) {
                      props.onNewintence(newIntence)
                    }
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
