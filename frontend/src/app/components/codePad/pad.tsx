import "ace-builds/src-noconflict/ace";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-monokai";
import { useEffect, useState } from "react";
import AceEditor from "react-ace";
interface PythonCodingpadProps {
  code: string;
  onChangeCode: any;
}
const PythonCodingPad = (props: PythonCodingpadProps) => {
  const [code, setCode] = useState('print("Hello, World!")');
  const [codeSide, setCodeSide] = useState({
    innerHeight: 0,
    innerWidth: "100%",
  });
  useEffect(() => {
    if (props.onChangeCode) {
      props.onChangeCode(code);
    }
  }, [code]);
  useEffect(() => {
    if (props.code) {
      setCode(props.code);
    }
  }, [props.code]);
  const runCode = () => {
    // console.log("Running Python code:", code);
  };
  useEffect(() => {
    setCodeSide({
      innerWidth: "100%",
    });
    resize();
  }, []);
  const resize = () => {
    window.addEventListener("resize", () => {
      setCodeSide({
        innerWidth: "100%",
      });
    });
  };

  return (
    <div>
      <AceEditor
        enableBasicAutocompletion={true} 
        enableLiveAutocompletion={true} 
        mode="python"
        theme="monokai"
        onChange={(value) => setCode(value)}
        value={code}
        name="python-editor"
        editorProps={{ $blockScrolling: true }}
        style={{
          width: codeSide.innerWidth,
        }}
      />
    </div>
  );
};

export default PythonCodingPad;
