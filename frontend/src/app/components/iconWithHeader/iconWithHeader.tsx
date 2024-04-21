interface IconWithHeaderProps {
    Icon: any;
    name: string;
  }
export default  function IconWithHeader(props: IconWithHeaderProps) {
    return (
      <div className="w-full flex items-center my-4">
        <div className="h-6 w-6 mx-2 p-[2px]">{<props.Icon fill="white" />}</div>
        <div className="text-sm">{props.name ?? "header"}</div>
      </div>
    );
  }
  