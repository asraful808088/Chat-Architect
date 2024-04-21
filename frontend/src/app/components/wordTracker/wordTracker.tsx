import useTools from "@/app/hook/useTools/useTools";
import { useEffect, useState } from "react";
interface WordTrackerProps {
  text: string;
  onSelect: any;
}
export default function WordTracker(props: WordTrackerProps) {
  const { xtrack_word_poistion } = useTools();
  const [wordList, setWordlist] = useState([]);
  useEffect(() => {
    setWordlist(xtrack_word_poistion(props.text) ?? []);
  }, []);
  if (wordList.length == 0) {
    return;
  }

  return wordList.map((element, index) => {
    return (
      <span
        className="overflow-hidden text-ellipsis h-full w-full"
        key={index}
        onDoubleClick={() => {
          if (props.onSelect) {
            props.onSelect(element);
          }
        }}
      >
        {element.word + " "}
      </span>
    );
  });
}
