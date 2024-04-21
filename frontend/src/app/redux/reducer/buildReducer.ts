import buildActionsType from "../actionType/build";
import buildState from "../state/build";
const buildReducer = (state = buildState, action) => {
  switch (action.type) {
    case buildActionsType.SHOW_STAP_INFO:
      return {
        ...state,
        show_stapInfo: action.show_stapInfo,
      };
    case buildActionsType.CHANEG_STAGE_OF_1:
      return {
        ...state,
        stapInfo: {
          ...state.stapInfo,
          stap_1: { ...state.stapInfo.stap_1, stage: action.stage },
        },
      };

    case buildActionsType.CHANEG_STAGE_OF_2:
      return {
        ...state,
        stapInfo: {
          ...state.stapInfo,
          stap_2: { ...state.stapInfo.stap_2, stage: action.stage },
        },
      };

    case buildActionsType.CHANEG_STAGE_OF_3:
      return {
        ...state,
        stapInfo: {
          ...state.stapInfo,
          stap_3: { ...state.stapInfo.stap_3, stage: action.stage },
        },
      };

    case buildActionsType.CHANEG_STAGE_OF_1_SUCCESS:
      return {
        ...state,
        stapInfo: {
          ...state.stapInfo,
          stap_1: { ...state.stapInfo.stap_1, success: action.success },
        },
      };

    case buildActionsType.CHANEG_STAGE_OF_2_SUCCESS:
      return {
        ...state,
        stapInfo: {
          ...state.stapInfo,
          stap_2: { ...state.stapInfo.stap_2, success: action.success },
        },
      };

    case buildActionsType.CHANEG_STAGE_OF_3_SUCCESS:
      return {
        ...state,
        stapInfo: {
          ...state.stapInfo,
          stap_3: { ...state.stapInfo.stap_3, success: action.success },
        },
      };

    case buildActionsType.CHANEG_STAGE_OF_1_INFO:
      return {
        ...state,
        stapInfo: {
          ...state.stapInfo,
          stap_1: { ...state.stapInfo.stap_1, info: action.info },
        },
      };

    case buildActionsType.CHANEG_STAGE_OF_2_INFO:
      return {
        ...state,
        stapInfo: {
          ...state.stapInfo,
          stap_2: { ...state.stapInfo.stap_2, info: action.info },
        },
      };

    case buildActionsType.CHANEG_STAGE_OF_3_INFO:
      return {
        ...state,
        stapInfo: {
          ...state.stapInfo,
          stap_3: { ...state.stapInfo.stap_3, info: action.info },
        },
      };

    case buildActionsType.CHANEG_STAGE_OF_1_WARNING:
      return {
        ...state,
        stapInfo: {
          ...state.stapInfo,
          stap_1: { ...state.stapInfo.stap_1, warning: action.warning },
        },
      };

    case buildActionsType.CHANEG_STAGE_OF_2_CHANEG_STAGE_OF_1_WARNING:
      return {
        ...state,
        stapInfo: {
          ...state.stapInfo,
          stap_2: { ...state.stapInfo.stap_2, warning: action.warning },
        },
      };

    case buildActionsType.CHANEG_STAGE_OF_3_CHANEG_STAGE_OF_2_CHANEG_STAGE_OF_1_WARNING:
      return {
        ...state,
        stapInfo: {
          ...state.stapInfo,
          stap_3: { ...state.stapInfo.stap_3, warning: action.warning },
        },
      };

    case buildActionsType.CHANEG_STAGE_OF_1_ERROR:
      return {
        ...state,
        stapInfo: {
          ...state.stapInfo,
          stap_1: { ...state.stapInfo.stap_1, errors: action.errors },
        },
      };










    case buildActionsType.CHANEG_STAGE_OF_2_ERROR:
      return {
        ...state,
        stapInfo: {
          ...state.stapInfo,
          stap_2: { ...state.stapInfo.stap_2, errors: action.errors },
        },
      };




      case buildActionsType.CHANGE_2_TO_HIDE_OPTIONS:
        return {
          ...state,
          stapInfo: {
            ...state.stapInfo,
            stap_2: { ...state.stapInfo.stap_2, hideBuildOption: action.value, },
          },
        };


        










    case buildActionsType.CHANEG_STAGE_OF_3_ERROR:
      return {
        ...state,
        stapInfo: {
          ...state.stapInfo,
          stap_3: { ...state.stapInfo.stap_3, errors: action.errors },
        },
      };





      
      
    case buildActionsType.CHANGE_STAP_1_QNIQUE_ITEM:
      return {
        ...state,
        stapInfo: {
          ...state.stapInfo,
          stap_1: { ...state.stapInfo.stap_1, uniqueItems: action.uniqueItems },
        },
      };








      case buildActionsType.BUILDING_RUNNING:
      return {
        ...state,
        stapInfo: {
          ...state.stapInfo,
          buildRunning: action.value,
        },
      };

      case buildActionsType.CHANGE_TOTAL_EP:
        return {
          ...state,
          stapInfo: {
            ...state.stapInfo,
            stap_3: { ...state.stapInfo.stap_3, totalEp: action.value },
          },
        };
  



        




    default:
      return state;
  }
};

export default buildReducer;
