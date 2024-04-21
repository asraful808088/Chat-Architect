interface WordPartProps {
  word: string;
  fristIndex: number;
  secoundIndex: number;
  index: number;
  onBlankPress: any;
  onPressIndex: any;
  fullIndex: boolean;
  color: string;
  fullTextColor: string;
  cursor: string;
  onDoubleClick: any;
  handleContextMenu: any;
  fullSmmText: boolean;
  beginingIndex: number;
}

export default function WordPart(props: WordPartProps) {
  const [letterList, setLetterList] = useState([]);
  const [clickIndex, setClickIndex] = useState([]);
  const [cursorPointer, setCursor] = useState(true);
  useEffect(() => {
    if (props.onSelect) {
      onSelect(clickIndex);
    }
  });
  useEffect(() => {
    const letterObjectList = [];
    const letters = props.word.split("");
    let count = props.beginingIndex ?? 0;

    if (letters) {
      letters.forEach((element, index) => {
        letterObjectList.push({
          letter: element,
          color: "red",
          index: count,
        });
        count++;
      });
      setLetterList(letterObjectList);
    }
  }, [props.beginingIndex, props.word]);

  function indexCalculate(index1, index2) {
    if (index1 != null && index2 != null) {
      if (index2 < index1) {
        return {
          firstIndex: index2,
          secoundIndex: index1,
        };
      } else if (index2 > index1) {
        return {
          firstIndex: index1,
          secoundIndex: index2,
        };
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  const handleMouseLeave = () => {
    setCursor(true);
  };

  function calculateColor(props, index) {
    if (props.fullIndex == true) {
      return "green";
    } else if (props.fristIndex == null && props.secoundIndex == null) {
      return "";
    } else if (
      indexCalculate(props.fristIndex, props.secoundIndex) != false &&
      indexCalculate(props.fristIndex, props.secoundIndex).firstIndex <=
        index &&
      indexCalculate(props.fristIndex, props.secoundIndex).secoundIndex > index
    ) {
      return "green";
    } else if (
      indexCalculate(props.fristIndex, props.secoundIndex) == false &&
      props.secoundIndex == null &&
      props.fristIndex <= index
    ) {
      return "green";
    } else if (
      indexCalculate(props.fristIndex, props.secoundIndex) == false &&
      props.fristIndex == null &&
      props.secoundIndex >= index
    ) {
      return "green";
    }
    return "";
  }

  return (
    <span
      className={`custom-selection ${props.fullSmmText ? "text-sm" : ""}`}
      onMouseMove={() => {
        if (event.ctrlKey && event.shiftKey) {
          setCursor(false);
        } else {
          setCursor(true);
        }
      }}
      onDoubleClick={props.onDoubleClick}
      style={{
        cursor: cursorPointer ? "pointer" : "",
        color: props.fullTextColor,
      }}
    >
      {letterList.map((element, index) => {
        return (
          <span
            onContextMenu={props.handleContextMenu}
            onMouseLeave={handleMouseLeave}
            key={index}
            className="custom-selection"
            style={{
              color: calculateColor(props, index),
            }}
            onClick={() => {
              if (event.ctrlKey && event.shiftKey) {
                if (props.onPressIndex) {
                  props.onPressIndex({
                    index: props.index,
                    wordIndex: index,
                    pressIndex: element.index,
                    lastIndex: letterList[letterList.length - 1].index,
                  });
                }
              } else {
                if (props.onBlankPress) {
                  props.onBlankPress([]);
                }
              }
            }}
          >
            {element.letter}
          </span>
        );
      })}
    </span>
  );
}
