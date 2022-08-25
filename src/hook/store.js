import React, {createContext,useContext,useState} from 'react'

const StateContext = createContext()

export const ContextProvider = ({children}) => {

    const [userId,setUserId] = useState("")
    const [selectId,setSelectId] = useState('')

    return (
        <StateContext.Provider
            value={{userId,setUserId, selectId, setSelectId}}
        >
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)