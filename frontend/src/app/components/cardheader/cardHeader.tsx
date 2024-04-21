interface CardHeaderProps {
  name: string;
  
}
export default function CardHeader(props: CardHeaderProps) {
  return <div className="w-full text-lg relative ">{props.name??"header"}</div>;
}
