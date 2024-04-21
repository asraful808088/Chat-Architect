import buildActionType from "../actionType/build";
export function change_stap_1_stage(stage) {
  return {
    type: buildActionType.CHANEG_STAGE_OF_1,
    stage: stage??null,
  };
}

export function change_stap_1_uniqueItems(uniqueItems) {
  return {
    type: buildActionType.CHANGE_STAP_1_QNIQUE_ITEM,
    uniqueItems: uniqueItems??null,
  };
}



export function stapInfo_changer_of_build(value) {
  return {
    type: buildActionType.CHANEG_STAGE_OF_1,
    show_stapInfo: value??null,
  };
}

export function change_stap_2_stage(stage) {
  return {
    type: buildActionType.CHANEG_STAGE_OF_2,
    stage: stage??null,
  };
}

export function change_stap_3_stage(stage) {
  return {
    type: buildActionType.CHANEG_STAGE_OF_3,
    stage: stage??null,
  };
}

export function change_stap_1_success_status(value) {
  return {
    type: buildActionType.CHANEG_STAGE_OF_1_SUCCESS,
    success: value??null,
  };
}

export function change_stap_2_success_status(value) {
  return {
    type: buildActionType.CHANEG_STAGE_OF_2_SUCCESS,
    success: value??null,
  };
}

export function change_stap_3_success_status(value) {
  return {
    type: buildActionType.CHANEG_STAGE_OF_3_SUCCESS,
    success: value??null,
  };
}

export function change_1_info(value) {
  return {
    type: buildActionType.CHANEG_STAGE_OF_1_INFO,
    info: value??null,
  };
}

export function change_2_info(value) {
  return {
    type: buildActionType.CHANEG_STAGE_OF_2_INFO,
    info: value??null,
  };
}

export function change_3_info(value) {
  return {
    type: buildActionType.CHANEG_STAGE_OF_3_INFO,
    info: value??null,
  };
}

export function change_1_warning(value) {
  return {
    type: buildActionType.CHANEG_STAGE_OF_1_WARNING,
    warning: value??null,
  };
}

export function change_2_warning(value) {
  return {
    type: buildActionType.CHANEG_STAGE_OF_2_WARNING,
    warning: value??null,
  };
}

export function change_3_warning(value) {
  return {
    type: buildActionType.CHANEG_STAGE_OF_3_WARNING,
    warning: value??null,
  };
}

export function change_1_errors(value) {
  return {
    type: buildActionType.CHANEG_STAGE_OF_1_WARNING,
    errors: value??null,
  };
}

export function change_2_errors(value) {
  return {
    type: buildActionType.CHANEG_STAGE_OF_2_ERROR,
    errors: value??null,
  };
}




export function change_2_hideOptions(value) {
  return {
    type: buildActionType.CHANGE_2_TO_HIDE_OPTIONS,
    value: value??null,
  };
}



export function buildRunningState(value) {
  return {
    type: buildActionType.BUILDING_RUNNING,
    value: value??null,
  };
}






export function change_3_errors(value) {
  return {
    type: buildActionType.CHANEG_STAGE_OF_3_ERROR,
    errors: value??null,
  };
}


export function change_ep_value(value) {
  return {
    type: buildActionType.CHANGE_TOTAL_EP,
    value: value??0,
  };
}
