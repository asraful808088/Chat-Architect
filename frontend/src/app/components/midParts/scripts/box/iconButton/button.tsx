interface IconButtonProps {
  Icon: any;
  onClick: any;
  name: string;
}
export default function IconButton(props: IconButtonProps) {
  return (
    <div
      className="h-4 w-4 relative m-2 cursor-pointer hover:scale-[1.05] transition-all"
      onClick={() => {
        if (props.onClick) {
          props.onClick(props.name);
        }
      }}
    >
      <props.Icon fill="black" />
    </div>
  );
}
