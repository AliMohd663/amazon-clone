import React, { createContext, useReducer } from "react"

export const DataContext = createContext()

export  const DataProvider = ({ children, reduser, initialState }) => {
    return (

        <DataContext.Provider value={useReducer(reduser, initialState)}>
            {children}
        </DataContext.Provider>
    )

}
