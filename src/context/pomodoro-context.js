import { createContext, useContext,  useEffect, useMemo, useState } from "react";
import { addPomodoroData, getPerDayPomoData } from "../backend/controllers/PomodoroControllers";
import { getData, updateData } from "../backend/controllers/TaskControllers";
import { updateUser } from "../backend/controllers/UserControllers";
import useActiveUser from "../hooks/useActiveUser";
import { useAuth } from "./auth-context";


const PomodoroContext = createContext()


const PomodoroContextProvider = ( { children }) => {

    const date = useMemo(() => {
        return new Date().toDateString()
    },[])


    const [timerType, setTimerType] = useState({
        focus: 2,
        shortBreak: 1,
        longBreak: 60
    })
    const [sec,setSec] = useState(0)
    const [min,setMin] = useState(timerType.focus)
    const [focus,setFocus] = useState(true)
    const [pause,setPause] = useState(false)
    const [reset,setReset] = useState(true)
    const [shortBreak,setShortBreak] = useState(false)
    const [longBreak,setLongBreak] = useState(false)
    const [totalPomo, setTotalPomo] = useState({})
    const [pomodoroTask, setPomodoroTask] = useState('')
    const [allPomodoroTask,setAllPomodoroTasks] = useState([])
    const [todaysPomodoroTasks,setTodaysPomodoroTasks] = useState([])


    const { user } = useAuth()
    const { accountDetails } = useActiveUser(user?.uid)

    // Get AllPomodoro Tasks from Data Base 

    useEffect(() => {        
        const unSub = getData('PomoTask', user, setAllPomodoroTasks)
        
        return () => unSub && unSub()
    },[user])


    useEffect(() => {
        setTodaysPomodoroTasks(allPomodoroTask.filter(item => item.date === date))
    }, [date,allPomodoroTask])

    // Set Pomodoro Task and Pomodoro No 

    useEffect(() => {
        setPomodoroTask(accountDetails?.pomoDoroTask)
        // setTotalPomo(accountDetails?.totalPomoOfTheDay)
        getPerDayPomoData(user,date,setTotalPomo)
    }, [accountDetails,user,date])

    // console.log(pomodoroTask)

    // Change The Total Pomodoro Number Of The day to 0 if date changes

    useEffect(() => {
        if(user){
            updateUser(user?.uid, {
                pomoDoroTask:{},
            })
        }

        // eslint-disable-next-line
    },[date])

 


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
                            // let updatedPomoNo = timerType.focus === 1 ? {totalPomoOfTheDay: {...accountDetails.totalPomoOfTheDay, short: accountDetails?.totalPomoOfTheDay?.short + 1}} : {totalPomoOfTheDay: {...accountDetails.totalPomoOfTheDay, medium: accountDetails?.totalPomoOfTheDay?.medium + 1}}

                            // updateUser(user.uid,updatedPomoNo)

                            const data = {
                                date: date,
                                short: timerType.focus === 1 ? totalPomo?.short ? totalPomo.short + 1 : 1 : totalPomo?.short ?? 0,
                                long: timerType.focus !== 1 ? totalPomo?.long ? totalPomo.long + 1 : 1 : totalPomo?.long ?? 0
                            }

                            addPomodoroData(user,'PomoData', date,data)

                            startShortBreak()

                            if(pomodoroTask !== {}){
                                let activeTask = allPomodoroTask?.find(item => item.id === pomodoroTask.id)

                                let updatedData = timerType.focus === 1 ? {usedPomodoroNo:{...activeTask?.usedPomodoroNo, short: activeTask?.usedPomodoroNo?.short + 1} } : {usedPomodoroNo:{...activeTask?.usedPomodoroNo, medium: activeTask?.usedPomodoroNo?.medium + 1} }
                                
                                updateData(user,'PomoTask', pomodoroTask.id, updatedData)
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

    return (
        <PomodoroContext.Provider 
        value={{focus,startFocus,shortBreak,startShortBreak, longBreak, startLongBreak, pause,setPause,reset,setReset,setTimerType, pomoSec, pomoMin, pomodoroTask, setPomodoroTask, totalPomo, allPomodoroTask,todaysPomodoroTasks}}>
            {children}
        </PomodoroContext.Provider>
    )
}

const usePomo = () => useContext(PomodoroContext)

export { PomodoroContextProvider, usePomo }