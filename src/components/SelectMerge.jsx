import React, { useEffect, useState } from 'react'
import { mainContext } from '../context/context';

const SelectMerge = ({ lineNum, close }) => {
    const [selectedOld,setSelectedOld] = useState("")
    const [selectedNew,setSelectedNew] = useState("")
    const {handleSelectMerge, text1, text2} = mainContext()

    const index = lineNum - 1;

    useEffect(()=>{
         const oldArr = text1.split('\n')
         const newArr = text2.split('\n')
         setSelectedOld(oldArr[index])
         setSelectedNew(newArr[index])
    },[handleSelectMerge])

    const handleModify = (direction) => {
       switch (direction) {
        case "right":
            handleSelectMerge(lineNum,"right")
            break;
       
        case "left":
            handleSelectMerge(lineNum,"left")
            break;
       
        case "remove":
            handleSelectMerge(lineNum,"remove")
            close(false)
            break;
       
        default:
            break;
       }
    }

    return (
        <div className='fixed top-0 left-0 w-screen h-screen bg-black/60 flex justify-center items-center'>
            <div className='h-[300px] w-[auto] bg-[#2F323E] rounded-lg p-3 flex-col flex justify-between'>
                <div className='relative'>
                    <h1 className='text-center font-semibold'>Modify line</h1>
                    <svg onClick={() => close(false)} className='absolute right-0 top-0 cursor-pointer' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 50 50">
                        <path stroke='white' d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"></path>
                    </svg>
                </div>
                <div className='flex gap-2 h-[200px] w-full items-center justify-between p-2'>
                    <textarea disabled value={lineNum + " "+ selectedOld}
                        className="peer h-full min-h-[100px] w-full resize-none rounded-[7px] border border-blue-gray-200  px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                    ></textarea>
                    <textarea disabled value={lineNum + " "+ selectedNew}
                        className="peer h-full min-h-[100px] w-full resize-none rounded-[7px] border border-blue-gray-200  px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                    ></textarea>
                </div>
                <div className='flex justify-between gap-2'>
                    <button onClick={() => handleModify("right")} className="bg-white hover:bg-black text-black hover:text-white font-semibold py-1 px-2 md:py-2 md:px-4 border border-gray-400 rounded shadow">
                        To right -
                    </button>
                    <button onClick={() => handleModify("remove")} className="bg-white hover:bg-black text-black hover:text-white font-semibold py-1 px-2 md:py-2 md:px-4 border border-gray-400 rounded shadow">
                        Remove
                    </button>
                    <button onClick={() => handleModify("left")} className="bg-white hover:bg-black text-black hover:text-white font-semibold py-1 px-2 md:py-2 md:px-4 border border-gray-400 rounded shadow">
                        - To left
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SelectMerge
