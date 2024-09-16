import { useContext, createContext, useState } from "react";

const context = createContext()
   

export const ContextProvider = ({children}) => {
   const [text1,setText1] = useState(``)
   const [text2,setText2] = useState(``)
   const [result,setResult] = useState(``)

   function handleMerge(direction) {

      switch (direction) {
        case "right":
            setText2(text1)
            setResult(text1)
            break;
      
        case "left":
            setText1(text2)
            setResult(text2)
            break;
      
        default:
            break;
      }
   }

   function handleSelectMerge(lineNum, direction) {
    const index = lineNum - 1;
    let oldArr = text1.split('\n')
    let newArr = text2.split('\n')
    switch (direction) {
        case "right":
            newArr[index] = oldArr[index]
            setText2(newArr.join('\n'))
            break;
      
        case "left":
            oldArr[index] = newArr[index]
            setText1(oldArr.join('\n'))
            break;
      
        case "remove":
            oldArr[index] = ''
            newArr[index] = ''
            setText1(oldArr.join('\n'))
            setText2(newArr.join('\n'))
            break;
      
        default:
            break;
      }
      setResult(text2)
   }

   const values = {
    text1,
    setText1,
    text2,
    setText2,
    handleMerge,
    result
   }
   
    return <context.Provider value={values}>
        {children}
    </context.Provider>
}

export const mainContext = () =>{
    return useContext(context)
}