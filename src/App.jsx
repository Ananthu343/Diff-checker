import { useState } from "react";
import InputText from "./components/InputText";
import { mainContext } from './context/context'
import Diff from "./components/Diff";
import Header from "./components/Header";

export default function App() {
  const [showdiff, setShowDiff] = useState(false)

  const {
    text1,
    text2,
    setText1,
    setText2,
    handleMerge,
    result
  } = mainContext()

  const handleshow = () => {
    if (text1.length == 0 || text2.length == 0) {
      setShowDiff(false)
    } else {
      setShowDiff(true)
    }
  }

  const handleFileDownload = () => {
    if (result.length == 0) {
      return
    }
    const element = document.createElement("a");
    const file = new Blob([result], {
      type: "text/plain"
    });
    element.href = URL.createObjectURL(file);
    element.download = "myFile.txt";
    document.body.appendChild(element);
    element.click();  
  }; 

  return (
    <div className="text-white">
      <Header />
      <div className="flex flex-col items-center justify-center min-h-[400px] p-3">
        <h2 className="font-semibold">Try now !!</h2>
        <div className="flex p-5 gap-4 w-full flex-wrap lg:flex-nowrap">
          <InputText onChange={setText1} val={text1} name={"Old text"} />
          <InputText onChange={setText2} val={text2} name={"New text"} />
        </div>
        <div className="w-full flex justify-end p-5">
          <button onClick={handleshow} className="bg-white hover:bg-black text-black hover:text-white font-semibold py-1 px-2 md:py-2 md:px-4 border border-gray-400 rounded shadow">
            Show difference
          </button>
        </div>
      </div>
      {showdiff && <hr /> &&
        <h1 className="text-center m-5 text-xl font-semibold">Difference</h1>}
      {showdiff &&
        <div className="p-3 flex flex-col justify-center items-center w-full">
          <div className="w-full bg-[#2F323E] min-h-[400px]">
            <Diff />
          </div>
          <div className="p-3 gap-4 flex border mt-5 rounded-full px-[10px]">
            <button className="rounded-full bg-gradient-to-tr from-slate-800 to-slate-700 p-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
              <img width="20" height="20" src="https://img.icons8.com/office/40/copy.png" alt="copy" />
            </button>
            <button onClick={() => handleMerge("right")} className="bg-white hover:bg-black text-black hover:text-white font-semibold py-1 px-2 md:py-2 md:px-4 border border-gray-400 rounded shadow">
              Merge to right -
            </button>
            <button onClick={() => handleMerge("left")} className="bg-white hover:bg-black text-black hover:text-white font-semibold py-1 px-2 md:py-2 md:px-4 border border-gray-400 rounded shadow">
              - Merge to left
            </button>
            <button onClick={handleFileDownload} className="rounded-full bg-gradient-to-tr from-slate-800 to-slate-700 p-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
              <img width="20" height="20" src="https://img.icons8.com/fluency/48/download.png" alt="download" />
            </button>
          </div>
        </div>
      }
    </div>
  )
}
