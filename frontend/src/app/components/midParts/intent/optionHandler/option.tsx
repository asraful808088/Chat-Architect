import Options from "@/app/components/option/option";
import { PopupClosebutton } from "@/app/components/popUpTools/popupTools";
import Wrongoptions from "../optionDisplay/fussyWrong/fussyoption";
import LetterOption from "../optionDisplay/letterOption/letteroption";
import RemovePunctuation from "../optionDisplay/removePun/removePun";
import { useEffect, useState } from "react";
import ProcessWithGlobleSyn from "../optionDisplay/processWithglobleSyn/globleSyn";
import { createDefaultOptions } from "../default/option";
enum OptionsType {
    fussyWrong,
    fewWrong,
    fullWrong,
    letterModify,
    globleSynSelector,
    punctuationRemove,
  }
interface OptionsHandlerProps{
  option:any
  update:any
}
export default function OptionsHandler(props:OptionsHandlerProps){
    const [optionPopup, setOptionpopup] = useState(false);
    const [optionPopupMode, setOptionPopupMode] = useState(null);
    const [globleOption, setGlobleOption] = useState<OptionType>(
        createDefaultOptions()
      );
      
      useEffect(()=>{
        setGlobleOption(props.option??createDefaultOptions())
      },[props.option])
    return <Options
    intentce={optionPopupMode}
    onOpenPopup={(obj) => {
      if (obj.name == "fussy wrong generate") {
        setOptionPopupMode(OptionsType.fussyWrong);
      } else if (obj.name == "wrong generate for ask") {
        setOptionPopupMode(OptionsType.fewWrong);
      } else if (obj.name == "full wrong generate") {
        setOptionPopupMode(OptionsType.fullWrong);
      } else if (obj.name == "letter case modify") {
        setOptionPopupMode(OptionsType.letterModify);
      }else if (obj.name == "process by remove punctuation") {
        setOptionPopupMode(OptionsType.punctuationRemove);
      }else if (obj.name == "process with globle synonyms") {
        setOptionPopupMode(OptionsType.globleSynSelector);
      }

      setOptionpopup(true);
    }}
    PopupChild={
      <div className="h-[550px] w-[900px] bg-white shadow-md rounded-md px-4 py-2">
        <PopupClosebutton
          onClose={() => {
            setOptionpopup(false);
            setOptionPopupMode(null);
          }}
        />
        {optionPopupMode == OptionsType.fussyWrong ||
        optionPopupMode == OptionsType.fewWrong ||
        optionPopupMode == OptionsType.fullWrong ? (
          <Wrongoptions
            changeState={setGlobleOption}
            intentce={globleOption}
            fewWrongMode={optionPopupMode == OptionsType.fewWrong}
            fussyWrongMode={optionPopupMode == OptionsType.fussyWrong}
            onNewintence={(value)=>{
              if (props.update) {
                props.update(value)
              }
            }}
          />
        ) : optionPopupMode == OptionsType.letterModify ? (
          <LetterOption
            intence={globleOption}
            changeState={setGlobleOption}
            onNewintence={(value)=>{
              if (props.update) {
                props.update(value)
              }
            }}
          />
        ) : optionPopupMode == OptionsType.punctuationRemove ? (
          <RemovePunctuation
            intence={globleOption}
            changeState={setGlobleOption}
            onNewintence={(value)=>{
              if (props.update) {
                props.update(value)
              }
            }}
          />
        ) : optionPopupMode == OptionsType.globleSynSelector ? 
          <ProcessWithGlobleSyn
            intence={globleOption}
            changeState={setGlobleOption}
            onNewintence={(value)=>{
              if (props.update) {
                props.update(value)
              }
            }}
          />:null}
      </div>
    }
    activePopup={optionPopup}
    enableTh={true}
    items={[
      {
        name: "fussy wrong generate",
        checked: globleOption.FWG.checked,
        options: true,
      },
      {
        name: "wrong generate for ask",
        checked: globleOption.WGFA.checked,
        options: true,
      },
      {
        name: "full wrong generate",
        checked: globleOption.FLWG.checked,
        options: true,
      },
      {
        name: "letter case modify",
        checked: globleOption.letterProcess.checked,
        options: true,
      },
      {
        name: "process with globle synonyms",
        checked: globleOption.PWGS.checked,
        options: true,
      },
      {
        name: "process by remove punctuation",
        checked: globleOption.PBRP.checked,
        options: true,
      },
      { name: "cross synonyms adjust", checked: globleOption.CSA.checked },
      {
        name: "whole synonyms adjust in sentence",
        checked: globleOption.WSAIS.checked,
      },
    ]}
    onChange={(value) => {
      let updateIntence ;
      if (value.name == "fussy wrong generate") {
        updateIntence = {
          ...globleOption,
          FWG: { ...globleOption.FWG, checked: !value.checked },
        }
        setGlobleOption(updateIntence);
      } else if (value.name == "wrong generate for ask") {
        updateIntence = {
          ...globleOption,
          WGFA: { ...globleOption.WGFA, checked: !value.checked },
        }
        setGlobleOption(updateIntence);
      } else if (value.name == "process with globle synonyms") {
        updateIntence = {
          ...globleOption,
          PWGS: { ...globleOption.PWGS, checked: !value.checked },
        }
        setGlobleOption(updateIntence);
      } else if (value.name == "process by remove punctuation") {
        updateIntence = {
          ...globleOption,
          PBRP: { ...globleOption.PBRP, checked: !value.checked },
        }
        setGlobleOption(updateIntence);
      } else if (value.name == "cross synonyms adjust") {
        updateIntence ={
          ...globleOption,
          CSA: { ...globleOption.CSA, checked: !value.checked },
        }
        setGlobleOption(updateIntence);
      } else if (value.name == "whole synonyms adjust in sentence") {
        updateIntence = {
          ...globleOption,
          WSAIS: { ...globleOption.WSAIS, checked: !value.checked },
        }
        setGlobleOption(updateIntence);
      }else if (value.name == "letter case modify") {
        updateIntence ={
          ...globleOption,
          letterProcess: { ...globleOption.letterProcess, checked: !value.checked },
        }
        setGlobleOption(updateIntence);
      }else if (value.name == "full wrong generate") {
        updateIntence ={
          ...globleOption,
          FLWG: { ...globleOption.FLWG, checked: !value.checked },
        }
        setGlobleOption(updateIntence);
      }

      if (updateIntence && props.update) {
        props.update(updateIntence)
      }
    }}
  />
}