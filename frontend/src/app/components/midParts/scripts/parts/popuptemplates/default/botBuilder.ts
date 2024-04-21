import { uuid } from "uuidv4";
const defaultValue = {
  epoch: {
    default: 100,
    active: null,
    listOfItems: [100, 50, 20, 10, 5],
  },
  learningRate: {
    default: 0.001,
    active: null,
    listOfItems: [0.1, 0.01, 0.001, 0.0001],
  },
  outputDim: {
    default: 64,
    active: null,
    listOfItems: [80, 70, 64, 60, 40, 32, 16, 8, 4, 2],
  },
  testingRate: {
    default: 0.2,
    active: null,
    listOfItems: [0.1, 0.2],
  },
  earlyStoping: {
    enable: false,
    default: {
      min_delta: { default: 0.0001, active: null, listOfItems: [0.0001,0.001,0.01,] },
      peti: { default: 20, active: null, listOfItems: [20,15,10,5,3,1] },
      restore_best_weights: true,
    },
  },
  h_layers: [],
};

export const dropoutDefault = () => {
  return {
    id: uuid(),
    type: "dropout",
    rate: {
      default: 0.1,
      active: null,
      listOfItems: [0.1, 0.2],
    },
  };
};
export const lstmDefault = () => {
  return {
    id: uuid(),
    type: "lstm",
    persep: {
      default: 1,
      active: null,
      listOfItems: [1, 2, 3, 4, 5, 6, 7],
    },
    activation: "tanh",
    l1: {
      default:null,
      active: null,
      listOfItems: [0.1, 0.2],
    },
    l2: {
      default: null,
      active: null,
      listOfItems: [0.1, 0.2],
    },
  };
};
export default defaultValue;
