import { createContext, useContext, useEffect, useMemo, useReducer, useState } from "react";
import { taskReducer } from "../reducers/task-reducer";
// import { v4 as uuid } from 'uuid'


const KisContext = createContext()

// const initialTask = [
//     {
//         id: uuid(),
//         name: 'Read Book',
//         taskType: 'KIS',
//         completed: false
//     },
//     {
//         id: uuid(),
//         name: 'Complete Code',
//         taskType: 'KIS',
//         completed: false
//     },
//     {
//         id: uuid(),
//         name: 'Sleep early',
//         taskType: 'KIS',
//         completed: false
//     },
// ]

const KisContextProvider = ({ children }) => {
    
    const date = useMemo(() => {
        return new Date()
    }, [])
    
    const kisDataOfTheDayLocal = useMemo(() => {
        return JSON.parse(localStorage.getItem('magnifierKisTask'))
    },[]) 

    const kisTasksLocal = kisDataOfTheDayLocal?.kisTask ?? []

    const [state,dispatch] = useReducer(taskReducer,kisTasksLocal)
    const [kisHistory, setKisHistory] = useState([])

    // Store KIS tasks in Local Storage
    useEffect(() => {
        localStorage.setItem('magnifierKisTask', JSON.stringify({
            date: date.getDate(),
            kisTask: state
        }))
    },[date,state])

    // Reset Kis Task Data If Date Change
    useEffect(() => {
        if(date.getDate() !== kisDataOfTheDayLocal?.date){
            dispatch({type:'CLEAR'})
        }
    },[date,kisDataOfTheDayLocal])


    return(
        <KisContext.Provider value={{state,dispatch, kisHistory,setKisHistory}}>
            { children }
        </KisContext.Provider>
    )
}

const useKis = () => useContext(KisContext)

export { KisContextProvider , useKis }