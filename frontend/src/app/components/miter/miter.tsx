import Stick from "@/assets/svg/miter/stick.svg";
import { useEffect, useRef, useState } from "react";

interface MiterProps {
  rate: number;
}
export default function Miter(props: MiterProps) {
  const miterRef = useRef();
  const [strokeDasharray, setstrokeDasharray] = useState({
    strokeDasharray: "",
    strokeDashoffset: "",
  });
  function percentageToDegree(percentage, minAngle = -16, maxAngle = 225) {
    percentage = Math.max(0, Math.min(100, percentage));
    const degreeRange = maxAngle - minAngle;
    const degree = minAngle + (percentage / 100) * degreeRange;
    return degree;
  }
  useEffect(() => {
    const totalPathLength = miterRef.current?.getTotalLength();
    setstrokeDasharray((prev) => ({
      ...prev,
      strokeDasharray: totalPathLength,
    }));
  }, []);

  useEffect(() => {
    const percentage = Math.max(0, Math.min(100, props.rate));
    let temp = 100 - percentage;
    const totalPathlength = miterRef.current.getTotalLength();
    const offset = (totalPathlength / 100) * temp;
    setstrokeDasharray((prev) => ({
      ...prev,
      strokeDashoffset: offset,
    }));
  }, [props.rate]);
  return (
    <div className="w-full relative ">
      <div
        className="absolute w-full -rotate-[20deg] transition-all z-50"
        style={{
          transform: `rotate(${percentageToDegree(props.rate ?? 0)}deg)`,
          transitionDuration: ".5s",
        }}
      >
        <Stick />
      </div>

      

      <div
        style={{
          transform: "rotateY(180deg)",
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 276.49 276.49">
          <defs>
            <style></style>
          </defs>
          <g id="Layer_2" data-name="Layer 2">
            <g id="Layer_1-2" data-name="Layer 1">
              <g id="Layer_2-2" data-name="Layer 2">
                <g id="Layer_1-2-2" data-name="Layer 1-2">
                  <path
                   ref={miterRef}
                   className="transition-all" 
                    stroke="white"
                    strokeWidth="10px"
                    d="M248.1,199.12a130,130,0,1,0-226.2,0"
                    strokeLinecap="round"
                    strokeDasharray={`${strokeDasharray.strokeDasharray} ${strokeDasharray.strokeDasharray}`}
                  />
                </g>
              </g>
              <g id="Layer_2-3" data-name="Layer 2">
                <g id="Layer_1-2-3" data-name="Layer 1-2">
                  <path
                    className="transition-all duration-500"
                    stroke="red"
                    strokeWidth="5px"
                    d="M248.1,199.12a130,130,0,1,0-226.2,0"
                    strokeLinecap="round"
                    strokeDasharray={`${strokeDasharray.strokeDasharray} ${strokeDasharray.strokeDasharray}`}
                    strokeDashoffset={`${strokeDasharray.strokeDashoffset}`}
                  />
                </g>
              </g>
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}
