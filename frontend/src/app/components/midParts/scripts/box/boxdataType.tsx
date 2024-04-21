import { uuid } from "uuidv4";
interface FuncOption {
  name: string;
  items: Array;
  setValue: any;
}
export interface Boxdatatype {
  id: string;
  type: string;
  index: number;
  prefixfunc: FuncOption;
  nextConv: Boxdatatype;
  alterConv: Array<Boxdatatype>;
  defaultAlternative: Boxdatatype;
  intent: string;
  response: Array;
  responseType: string;
  optionRes: Array;
  preBuildAlternative: Array;
  sequence: boolean;
  loopActive: LoopObject;
  conditionItems: object;
  storeConvIndex: Array;
  storeNextTopic: object;
  listOfIntent: Array;
  listOfConditions: Array;
  listOfResponses: Array;
  underOf:string
}

interface LoopObject {
  active: boolean;
  returnIndex: object;
}
export const defaultValueOfBox: Boxdatatype = (initValue: Boxdatatype) => {
  return {
    listOfIntent: [],
    listOfConditions: [],
    listOfResponses: [],
    storeConvIndex: [],
    underOf:"",
    id: uuid(),
    type: initValue?.type ?? "init",
    index: initValue?.index ?? 0,
    prefixfunc: initValue?.prefixfunc ?? null,
    nextConv: initValue?.nextConv ?? null,
    alterConv: initValue?.alterConv ?? [],
    defaultAlternative: initValue?.defaultAlternative ?? null,
    conditionItems: {
      items: [],
      setValue: "",
    },
    responseType: "default",
    intent: null,
    response: [],
    optionRes: [],
    sequence: true,
    preBuildAlternative: [],
    loopActive: {
      active: false,
      returnIndex: {
        colIndex: "",
      },
    },
  };
};
