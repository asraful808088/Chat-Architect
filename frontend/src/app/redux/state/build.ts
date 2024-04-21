

const buildState = {
  show_stapInfo:false,
  stapInfo:{
    buildRunning:false,
    stap_1:{
      stage:"",
      success:false,
      info:[],
      warnings:[],
      errors:[],
      uniqueItems:{}
    },
    stap_2:{
      stage:"",
      success:false,
      info:[],
      warnings:[],
      errors:{},
      hideBuildOption:false
    },
    stap_3:{
      stage:"",
      success:false,
      info:[],
      warnings:[],
      errors:[],
      totalEp:0
      
    },
  }
};

export default buildState;
