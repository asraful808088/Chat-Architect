import Bar from "@/app/components/charts/bar/bar";
import { useRef } from "react";
export default function BarChat() {
  const ref = useRef();
  return (
    <div className="w-full">
      <Bar ref={ref} />
    </div>
  );
}
