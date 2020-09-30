import React from "react";
import AceEditor from "react-ace";
import "ace-builds/webpack-resolver";
import "ace-builds/src-noconflict/mode-javascript";
// import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/theme-kuroir";
import "ace-builds/src-noconflict/theme-xcode";
import "ace-builds/src-noconflict/theme-textmate";
import "ace-builds/src-noconflict/theme-terminal";
import "ace-builds/src-noconflict/theme-solarized_dark";
import "ace-builds/src-noconflict/theme-solarized_light";

const CodeEditor = ({ theme, run }) => {
  const onLoad = () => {
    console.log("theme", theme);
  };

  const onChange = () => {
    console.log("on change");
  };

  return (
    <AceEditor
      placeholder="Placeholder Text"
      mode="javascript"
      theme={theme}
      name="blah2"
      onLoad={onLoad}
      onChange={onChange}
      width="100%"
      height={run ? "86%" : "80%"}
      fontSize={12}
      showPrintMargin={true}
      showGutter={true}
      highlightActiveLine={true}
      value={`// Type your code here
`}
      style={{ marginTop: "40px" }}
      setOptions={{
        showLineNumbers: true,
        tabSize: 2,
      }}
    />
  );
};

export default CodeEditor;