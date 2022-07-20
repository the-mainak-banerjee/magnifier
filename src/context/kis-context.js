import { createContext, useContext, useReducer } from "react";
import { taskReducer } from "../reducers/task-reducer";
// import { v4 as uuid } from 'uuid'


const KisContext = createContext()

const initialTask = [
    // {
    //     id: uuid(),
    //     name: 'Read Book',
    //     type: 'KIS',
    //     completed: false
    // },
    // {
    //     id: uuid(),
    //     name: 'Complete Code',
    //     type: 'KIS',
    //     completed: false
    // },
    // {
    //     id: uuid(),
    //     name: 'Sleep early',
    //     type: 'KIS',
    //     completed: false
    // },
]

const KisContextProvider = ({ children }) => {
    const [state,dispatch] = useReducer(taskReducer,initialTask)
    return(
        <KisContext.Provider value={{state,dispatch}}>
            { children }
        </KisContext.Provider>
    )
}

const useKis = () => useContext(KisContext)

export { KisContextProvider , useKis }