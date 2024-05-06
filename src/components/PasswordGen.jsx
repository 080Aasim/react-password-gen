import React, {useState, useCallback, useEffect, useRef} from 'react'

function PasswordGen() {
    const [length, setLength] = useState(8);
    const [numAllowed, setNumAllowed] = useState("false")
    const [charAllowed, setCharAllowed] = useState("false")
    const [password, setPassword] = useState("")

    const passwordGen = useCallback(() => {
        let pass = ""
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

        if (numAllowed) str += "0123456789"
        if (charAllowed) str += "~!@#$%^&*+=_-':><.,?/|{}[]"

        for (let i = 1; i <= length; i++) {
            let char = Math.floor(Math.random() * str.length + 1)
            pass += str.charAt(char)
        }

        setPassword(pass)

    },[length,numAllowed,charAllowed,setPassword])

    const copyPasswordToClipboard = useCallback(() =>{
        passwordRef.current?.select()
        passwordRef.current?.setSelectionRange(0,999)
        window.navigator.clipboard.writeText(password)
    },[password])

    useEffect(() => {
        passwordGen()
    }, [length,numAllowed,charAllowed,passwordGen]);

    const passwordRef = useRef(null)


  return (

    <>
        <div className='w-full max-w-xl mx-auto shadow-md rounded-lg px-4 my-8 py-4 text-orange-500 bg-gray-600'>
            <h1 className='text-white text-center mb-2 text-xl'>Password Generator</h1>
            <div className='flex shadow rounded-lg overflow-hidden'>
                <input 
                type="text" 
                value={password} 
                className='outline-none w-full py-1 px-3' 
                placeholder='password' 
                readOnly
                ref={passwordRef} 
                />

                <button 
                className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
                onClick={copyPasswordToClipboard}
                >Copy</button>
            </div>
            <div className='flex text-sm gap-x-2 mt-4'>
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
                <div>
                    <input 
                    type="checkbox"
                    defaultChecked={numAllowed}
                    id='numberInput'
                    onChange={() => {
                        setNumAllowed((prev) => !prev);
                    }}

                    />
                    <label htmlFor='numberInput'> Number</label>
                </div>
                <div>
                    <input 
                    type="checkbox"  
                    id="characterInput" 
                    defaultChecked={charAllowed} 
                    onChange={()=> {
                        setCharAllowed((prev) => !prev)
                    }}/>
                    <label htmlFor="characterInfo"> Characters</label>
                </div>
            </div>
        </div>
    </>
  )
}

export default PasswordGen