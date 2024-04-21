interface BodyHeaderProps {
  name: string;
  showSideButton: boolean;
}
export default function BodyHeader(props: BodyHeaderProps) {
  return (
    <div className="text-lg text-black flex justify-between cursor-pointer">
      <div>{props.name ?? "Header"}</div>
    </div>
  );
}
