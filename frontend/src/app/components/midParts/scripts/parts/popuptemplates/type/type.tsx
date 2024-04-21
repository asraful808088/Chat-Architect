// number will be int
interface TypeForInt {
  default: number;
  active: number;
  listOfItems: Array<number>;
}
// number will be double or float

interface TypeForNoneInt {
  default: number;
  active: number;
  listOfItems: Array<number>;
}

interface SubTypeForObjectWithBool {
  restore_best_weights: boolean;
  min_delta: TypeForNoneInt;
  peti: TypeForInt;
}
interface TypeForObjectWithBool {
  enable: boolean;
  default: SubTypeForObjectWithBool;
  active: SubTypeForObjectWithBool;
}

interface TypeForLSTM {
  type: string;
  persep: string;
  l1: TypeForNoneInt;
  l2: TypeForNoneInt;
}
interface TypeForDropOut {
  type: string;
  rate: TypeForNoneInt;
}
export interface BotBuilderType {
  epoch: TypeForInt;
  learningRate: TypeForNoneInt;
  outputDim: TypeForInt;
  testingRate: TypeForNoneInt;
  earlyStoping: TypeForObjectWithBool;
  h_layers: Array<TypeForLSTM | TypeForDropOut>;
}

export const LayerType = {
  LSTM:"lstm",
  DROPOUT:"dropout"
}
