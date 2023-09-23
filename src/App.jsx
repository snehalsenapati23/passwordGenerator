import { useEffect } from "react"
import { useState,useCallback,useRef } from "react"


function App() {
const [length,setLength]=useState(8)
const [numAllowed,setNumAllowed]=useState(false)
const [charAllowed,setCharAllowed]=useState(false)
const [password,setPassword]=useState("")

const passwordGenerator=useCallback(()=>{
  let pass=""
  let str="ABCDEGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
  if(numAllowed)
  str+="0123456789"
if(charAllowed)
str+='!@#$%^&*-_+=[]{}~`'
for(let i=0;i<length;i++){
    let char=Math.floor(Math.random()*str.length+1)
    pass+=str.charAt(char)
}
setPassword(pass)
},[numAllowed,charAllowed,length,setPassword])

//useRef
const passwordRef=useRef(null)


useEffect(()=>{
passwordGenerator()
},[length,passwordGenerator,charAllowed,numAllowed])

const copyPasswordToClipBoard=useCallback(()=>{
  passwordRef.current?.select()
  passwordRef.current.setSelectionRange(0,999)
  window.navigator.clipboard.writeText(password)
},[password])
  return (

      <div className=" w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className='text-white text-center my-3'>Password generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
            type="text"
            value={password}
            ref={passwordRef}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
         
        />
        <button
        
        className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0' onClick={copyPasswordToClipBoard}
        >copy</button>
        
    </div>
    <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input 
        type="range"
        min={6}
        max={100}
        value={length}
         className='cursor-pointer'
         onChange={(e) => {setLength(e.target.value)}}
          />
          <label>Length: {length}</label>
      </div>
      <div className="flex items-center gap-x-1">
      <input
          type="checkbox"
          defaultChecked={numAllowed}
          id="numberInput"
          onChange={() => {
              setNumAllowed((prev) => !prev);
          }}
      />
       <label htmlFor="numberInput">Numbers</label>
      </div>
      <div className="flex items-center gap-x-1">
          <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              onChange={() => {
                  setCharAllowed((prev) => !prev )
              }}
          />
          <label htmlFor="characterInput">Characters</label>
      </div>
    </div>

</div>
 
  )
}

export default App
