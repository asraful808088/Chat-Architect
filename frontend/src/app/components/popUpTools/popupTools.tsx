import React from "react";

interface PopupFrameProps {
  children: React.ReactNode;
  blurColor: string;
  active: boolean;
  duration: string;
}
export default function PopupFrame(props: PopupFrameProps) {
  return props.active ? (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: props.active ? "flex" : "none",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        top: "0",
        left: "0",
        zIndex:
          "9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999",
        backgroundColor: props.blurColor,
      }}
    >
      <div
        style={{
          transform: props.active ? "scale(1)" : "scale(0)",
          transition: props.duration ?? ".3s",
          width: "100%",
          display: props.active ? "flex" : "none",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {props.children}
      </div>
    </div>
  ) : null;
}
interface PopupClosebuttonProps {
  closeIconColor: string;
  onClose: any;
}
export function PopupClosebutton(props: PopupClosebuttonProps) {
  return (
    <div
      style={{ display: "flex", justifyContent: "end" }}
      onClick={() => {
        if (props.onClose) {
          props.onClose();
        }
      }}
    >
      <div
        style={{
          fontWeight: "900",
          transform: "rotate(45deg)",
          fontFamily: "initial",
          fontSize: "30px",
          color: props.closeIconColor ?? "black",
          marginRight: "10px",
          cursor:"pointer"
        }}
      >
        +
      </div>
    </div>
  );
}
