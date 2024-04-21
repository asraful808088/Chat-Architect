import OptionSelector from "@/app/components/option/option";
interface LetterOptionProps{
    intence:object,
    changeState:any
    onNewintence:any
}
export default function LetterOption(props:LetterOptionProps) {
  return (
    <div className="text-black">
      <div className="">Letter Modify</div>
      <div className="my-2">
        <OptionSelector
        hideHeader={true}
        onChange={(value)=>{
            if (props.changeState) {
              const newIntence = {...props.intence,letterProcess:{...props.intence.letterProcess,uppercase:!value.checked}}
                props.changeState(newIntence)
                if (props.onNewintence) {
                  props.onNewintence(newIntence)
                }
            }
        }}
          items={[
            { name: "Uppercase",checked:props.intence?.letterProcess?.uppercase },
          ]}
        />
      </div>
      <div className="my-2">
        <OptionSelector
        hideHeader={true}
        onChange={(value)=>{
            if (props.changeState) {
              const newIntence = {...props.intence,letterProcess:{...props.intence.letterProcess,lowercase:!value.checked}}
                props.changeState(newIntence)
                if (props.onNewintence) {
                  props.onNewintence(newIntence)
                }
            }
        }}
          items={[
            { name: "Lowercase",checked:props.intence?.letterProcess?.lowercase  },
          ]}
        />
      </div>
      <div className="my-2">
        <OptionSelector
        hideHeader={true}
        onChange={(value)=>{
            if (props.changeState) {
              const newIntence   = {...props.intence,letterProcess:{...props.intence.letterProcess,capitalize:!value.checked}}
                props.changeState(newIntence)
                if (props.onNewintence) {
                  props.onNewintence(newIntence)
                }
            }
        }}
          items={[
            { name: "Capitalize",checked:props.intence?.letterProcess?.capitalize  },
          ]}
        />
      </div>
    </div>
  );
}
