import { createContext, useContext,  useEffect,  useMemo,  useReducer,  useState } from "react";
import { taskReducer } from "../reducers/task-reducer";


const PomodoroContext = createContext()


const PomodoroContextProvider = ( { children }) => {

    const [timerType, setTimerType] = useState({
        focus: 2,
        shortBreak: 1,
        longBreak: 60
    })

    const date = useMemo(() => {
        return new Date()
    }, [])

    const pomoDataOfTheDayLocal = useMemo(() => {
        return JSON.parse(localStorage.getItem('magnifierPomoOfDay'))
    }, [])    


    const totalPomoLocal = pomoDataOfTheDayLocal?.pomoNo ?? 0
    const pomoTasksLocal = pomoDataOfTheDayLocal?.pomoTasks ?? []
    const currentPomoTaskLocal = pomoDataOfTheDayLocal?.currentTask ?? null

 
    const [sec,setSec] = useState(0)
    const [min,setMin] = useState(timerType.focus)
    const [focus,setFocus] = useState(true)
    const [pause,setPause] = useState(false)
    const [reset,setReset] = useState(true)
    const [shortBreak,setShortBreak] = useState(false)
    const [longBreak,setLongBreak] = useState(false)
    const [totalPomo, setTotalPomo] = useState(totalPomoLocal)
    const [pomodoroTask, setPomodoroTask] = useState(currentPomoTaskLocal)
    const [allPomodoroTask,dispatch] = useReducer(taskReducer,pomoTasksLocal)

    
    // Store Total No Of Pomodoro and tasks of the day in Local Storage

    useEffect(() => {
        localStorage.setItem('magnifierPomoOfDay' , JSON.stringify({
            date: date.getDate(),
            pomoNo: totalPomo,
            pomoTasks: allPomodoroTask,
            currentTask: pomodoroTask
        }))
    },[date,totalPomo,allPomodoroTask,pomodoroTask])


    // Change The Total Pomodoro Number Of The day to 0 if date changes

    useEffect(() => {
        if(date.getDate() !== pomoDataOfTheDayLocal?.date){
            setTotalPomo({short: 0, medium:0})
            dispatch({type: 'CLEAR'})
        }
    },[date,pomoDataOfTheDayLocal]) 


    const interval = setInterval(() => {
        clearInterval(interval)
        if(!reset){
            if(!pause){
                if(sec === 0){
                    if(min!==0){
                        setSec(59)
                        setMin(min-1)
                    }else{
                        if(focus){
                            timerType.focus === 1 ? setTotalPomo(prevData => ({...prevData, short:prevData.short + 1})) : setTotalPomo(prevData => ({...prevData, medium:prevData.medium + 1}))
                            startShortBreak()
                            if(pomodoroTask){
                                timerType.focus === 1 ? setPomodoroTask(item => ({
                                    ...item,
                                    usedPomodoroNo: {...item.usedPomodoroNo, short: item.usedPomodoroNo.short + 1}
                                })) : setPomodoroTask(item => ({
                                    ...item,
                                    usedPomodoroNo: {...item.usedPomodoroNo, medium: item.usedPomodoroNo.medium + 1}
                                }))
                                dispatch({type: 'UPDATE', id:pomodoroTask.id, timerType: timerType})
                            }
                        }else if(shortBreak){
                            startFocus()
                        }
                    }
                }else{
                    setSec(prevSec => prevSec - 1)
                }
            }
        }else if(focus){
            setSec(0);
            setMin(timerType.focus)
        }else if(shortBreak){
            setSec(0)
            setMin(timerType.shortBreak)
        }else if(longBreak){
            setSec(0)
            setMin(timerType.longBreak)
        }
    }, 1000)

    const startFocus = () => {
        setFocus(true)
        setReset(true)
        setPause(false)
        setShortBreak(false)
        setLongBreak(false)
    }
    const startShortBreak = () => {
        setFocus(false)
        setReset(true)
        setPause(false)
        setShortBreak(true)
        setLongBreak(false)
    }
    const startLongBreak = () => {
        setFocus(false)
        setReset(true)
        setPause(false)
        setShortBreak(false)
        setLongBreak(true)
    }

    const pomoSec = sec < 10 ? `0${sec}` : sec
    const pomoMin = min < 10 ? `0${min}` : min

    // console.log(totalPomo)

    return (
        <PomodoroContext.Provider 
        value={{focus,startFocus,shortBreak,startShortBreak, longBreak, startLongBreak, pause,setPause,reset,setReset,setTimerType, pomoSec, pomoMin, pomodoroTask, setPomodoroTask, totalPomo, allPomodoroTask,dispatch}}>
            {children}
        </PomodoroContext.Provider>
    )
}

const usePomo = () => useContext(PomodoroContext)

export { PomodoroContextProvider, usePomo }