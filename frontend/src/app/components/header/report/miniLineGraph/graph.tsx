import LineChart from "@/app/components/charts/line/line";
import React, { useRef } from "react";
interface MiniGraphProps {
  height: string;
  width: string;
  data_1: Array;
  data_2: Array;
}
function MiniGraphContainer(props: MiniGraphProps) {
  const ref = useRef()
  return (
    <div className="w-full">
      <div
        className={`${props.height ?? "h-[300px]"} ${
          props.width ?? "w-[500px] "
        }m-auto relative`}
      >
        <LineChart
          ref={ref}
          data={props.data_1 ?? []}
          data2={props.data_2 ?? []}
        />
      </div>
    </div>
  );
}

const MiniGraph = React.forwardRef(MiniGraphContainer);
export default MiniGraph;
