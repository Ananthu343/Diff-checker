import ReactDiffViewer from "react-diff-viewer-continued";
import Prism from 'prismjs'
import { mainContext } from "../context/context";
import DiffMethod from "../config/config";
import SelectMerge from "./SelectMerge";
import { useState } from "react";

const Diff = () => {
    const {text1, text2} = mainContext()
    const [modal, setModal] = useState(false)
    const [lineNum, setLinenUm] = useState(0)

    const highlightSyntax = (str) => {
      return str ? 
      <pre
        style={{ display: "inline" }}
        dangerouslySetInnerHTML={{
          __html: Prism.highlight(str, Prism.languages.txt),
        }}
      /> : null
      };

      const handleLinenum = (lineText) => {
         const linenum = lineText.slice(2)
         setLinenUm(Number(linenum))
         setModal(true)
      }
  
    return (
      <>
      <ReactDiffViewer
        oldValue={text1}
        newValue={text2}
        splitView={true}
        compareMethod={DiffMethod.WORDS}
        hideLineNumbers={false}
        renderContent={highlightSyntax}
        onLineNumberClick={(val) => handleLinenum(val)}
        useDarkTheme={true}
        leftTitle={"Old text"}
        rightTitle={"New text"}
      />
      {modal && <SelectMerge lineNum={lineNum} close={setModal}/>}
      </>
    );
  };

  export default Diff;