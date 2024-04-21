interface SelectionPadProps {
  items: Array;
  onclick: any;
  active: boolean;
  onClose: any;
  header:any
  
}
export default function SelectionPad(props: SelectionPadProps) {
  return props.active ? (
    <div className="absolute z-50 p-2 bg-white w-full  drop-shadow-md rounded-md text-xs left-0 ">
      <div className="flex relative justify-between items-center ">
        <div className="">{props.header??"header"}</div>
        <div
          className="rotate-45 relative font-sans font-extrabold text-2xl cursor-pointer"
          onClick={() => {
            if (props.onClose) {
              props.onClose();
            }
          }}
        >
          +
        </div>
      </div>
      <div className="w-auto">
        {props.items?.map((element, index) => {
          return (
            <SelectionItem
              key={index}
              value={element}
              onClick={() => {
                if (props.onclick) {
                  props.onclick(element);
                }
              }}
            />
          );
        })}
      </div>
    </div>
  ) : null;
}
interface SelectionItemProps {
  onClick: any;
  value: string;
}
function SelectionItem(props: SelectionItemProps) {
  return (
    <div
      className="w-full text-black flex items-center cursor-pointer "
      onClick={() => {
        if (props.onClick) {
          props.onClick();
        }
      }}
    >
      <div className="w-2 h-2 rounded-full bg-black mx-2 my-3"></div>
      <div className="hover:border-b border-black">{props.value}</div>
    </div>
  );
}
