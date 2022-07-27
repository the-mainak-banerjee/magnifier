// import { collection,  onSnapshot } from "firebase/firestore";
import { createContext, useContext, useEffect, useMemo, useReducer, useState } from "react";
import { taskReducer } from "../reducers/task-reducer";
// import { db } from "../backend/Firebase";
// import { v4 as uuid } from 'uuid'
import { useAuth } from "./auth-context";
import { getData } from "../backend/controllers/TaskControllers";



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
    
    const { user } = useAuth()

    const date = useMemo(() => {
        return new Date()
    }, [])
    
    const kisDataOfTheDayLocal = useMemo(() => {
        return JSON.parse(localStorage.getItem('magnifierKisTask'))
    },[]) 

    const kisTasksLocal = kisDataOfTheDayLocal?.kisTask ?? []


    const [state,dispatch] = useReducer(taskReducer,kisTasksLocal)
    const [kisHistory, setKisHistory] = useState([])
    const [kisOfTheDay, setKisOfTheDay] = useState([])
    const [loading,setLoading] = useState(false)

//    console.log(kisOfTheDay)

    // Store KIS tasks in Local Storage
    useEffect(() => {
        localStorage.setItem('magnifierKisTask', JSON.stringify({
            date: date.getDate(),
            user: user?.uid,
            kisTask: state
        }))

    },[date,state,user])


    // Reset Kis Task Data If Date Change
    useEffect(() => {
        if(date.getDate() !== kisDataOfTheDayLocal?.date || (user!==undefined && user.uid !== kisDataOfTheDayLocal?.user)){
            dispatch({type:'CLEAR'})
        }
    },[date,kisDataOfTheDayLocal,user])


    // Get Kis Data From database
    useEffect(() => {
        // const unSub = onSnapshot(collection(db, `users/${user?.uid}/KISTask`), (doc) => {
        //     const dataArr = []
        //     doc.forEach(item => {
        //        dataArr.push({...item.data(), id:item.id})
        //     })
        //     setKisOfTheDay(dataArr)
        // })

        const unSub = getData('KISTask', user, setKisOfTheDay,setLoading)
        
        return () => unSub && unSub()
    },[user])
    
    
    // Get Kis History From database
    useEffect(() => {
        // const unSub = onSnapshot(collection(db, `users/${user?.uid}/KISHistory`), (doc) => {
        //     const dataArr = []
        //     doc.forEach(item => {
        //        dataArr.push(item.data())
        //     })
        //     setKisHistory(dataArr)
        // })
        
        const unSub = getData('KISHistory', user, setKisHistory)
        
        return () => unSub && unSub()
    },[user])


    
    return(
        <KisContext.Provider value={{state,dispatch, kisHistory,setKisHistory, kisOfTheDay, loading}}>
            { children }
        </KisContext.Provider>
    )
}

const useKis = () => useContext(KisContext)

export { KisContextProvider , useKis }