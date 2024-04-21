import { useEffect, useState } from "react";
interface TextBiEffectProps {
  text: string;
  off: boolean;
}
export default function TextBiEffect(props: TextBiEffectProps) {
  const [text, setText] = useState("");
  const [count, setCount] = useState(0);
  useEffect(() => {
    const biEffecttextProcess = textBiSign(props.text ?? "");
    setText(`${biEffecttextProcess}`);
  }, [props.text]);
  useEffect(() => {
    if (!props.off) {
      let trackTime;
      trackTime = setInterval(() => {
        if (count < text.length + 1) {
          setCount((prev) => prev + 1);
          const newBi = textBiSign(props.text);
          const biExpression = newBi.slice(count, text.length);
          const textExpression = props.text.slice(0, count);
          setText(textExpression + biExpression);
        } else {
          clearInterval(trackTime);
        }
      }, 20);
      return () => clearInterval(trackTime);
    }
  }, [count, props.off, props.text, text, text.length]);
  function textBiSign(stringValue) {
    const biEffect = stringValue?.split("").map(() => {
      return Math.floor((Math.random() * 100) % 2);
    });
    return biEffect.join("");
  }
  if (props.off) {
    return <span className="break-words">{props.text}</span>;
  }
  return <span className="break-words">{text}</span>;
}
