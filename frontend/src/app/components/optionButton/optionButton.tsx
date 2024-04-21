interface OptionButtonProps {
  name: string;
  onClick: any;
}
export default function OptionButton(props: OptionButtonProps) {
  return (
    <div
      className="p-2 flex justify-center items-center border border-black rounded-md text-black text-xs mr-1 my-1 cursor-pointer transition-all hover:scale-[1.03]"
      onClick={() => {
        if (props.onClick) {
          props.onClick(props.name);
        }
      }}
    >
      {props.name}
    </div>
  );
}
