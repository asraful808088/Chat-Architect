import OptionSelector from "@/app/components/option/option";
import { useState } from "react";
interface RemovePunctuationProps {
  intence: object;
  changeState: any;
  onNewintence:any
}
export default function RemovePunctuation(props: RemovePunctuationProps) {
  const [inputText,setInputText]  = useState("")
  return (
    <div className="text-black">
      <div className="text-black">process by remove punctuation</div>
      <div className="">
        <div className="text-xs mt-5">Default</div>
        <OptionSelector
          hideHeader={true}
          onChange={(value) => {
            if (props.changeState) {
              const newintence = {
                ...props.intence,
                PBRP: {
                  ...props.intence.PBRP,
                  default: {
                    ...props.intence.PBRP.default,
                    set: !value.checked,
                  },
                },
              }
              props.changeState(newintence);
              if (props.onNewintence) {
                props.onNewintence(newintence)
              }
            }
          }}
          items={[
            {
              name: "',', '.', '!', '?', ';', ':', '-', '_', '(', ')', '[', ']', '{', '}', '<', '>', '/', '|', '\\', '`', '~', '@', '#', '$', '%', '^', '&', '*', '+', '='",
              checked: props.intence.PBRP.default.set,
            },
          ]}
        />
      </div>
      {!props.intence.PBRP.default.set ? (
        <>
          <div className="text-xs mt-5">Custom</div>
          <div className="">
            <input
              type="text"
              name=""
              id=""
              className="my-2 text-xs border-b-2  border-black outline-none"
              placeholder="add"
              value={inputText}
              onChange={(e)=>{
                setInputText(e.target.value)
              }}
              onKeyDown={(e)=>{
                  if (e.key=="Enter") {
                    setInputText("")
                    if (props.changeState) {
                      const newIntence = {...props.intence,PBRP:{...props.intence.PBRP,custom:{...props.intence.PBRP.custom,items:[...props.intence.PBRP.custom.items,inputText]}}}
                      props.changeState(newIntence)
                      if (props.onNewintence) {
                        props.onNewintence(newIntence)
                      }
                    }
                  }
              }}
            />
          </div>
          <div className="w-full relative flex flex-wrap">
          {props?.intence?.PBRP?.custom?.items.map((element,index)=>{
            return <span className="mr-2 text-xs my-2" key={index}>{element}</span>
          })}
      </div>
        </>
      ) : null}
      
      
    </div>
  );
}
