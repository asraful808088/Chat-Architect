interface ItemIndicatorProps {
  name: string;
  lineActive:boolean
  onDelete:any
  hideCross:boolean
}
export default function ItemIndicator(props: ItemIndicatorProps) {
  return (
    <div className="flex items-center">
      <div className="">
        {props.lineActive?<div className="w-[1px]  h-4 border-l-2 border-dotted  border-black ml-[11px]"></div>:null}
        <div className="flex items-center">
          <div className="h-2 w-2 bg-black rounded-full relative mx-2"></div>
          <div className="">{props.name ?? "default-test"}</div>
          {!props.hideCross?<div className="rotate-45 text-xl cursor-pointer font-mono font-extrabold mx-2" onClick={()=>{
            if (props.onDelete) {
              props.onDelete(props.name)
            }
          }}>
            +
          </div>:null}
        </div>
      </div>
    </div>
  );
}
