import { v4 as uuid } from 'uuid'

export const taskReducer = (state,action) => {
    switch(action.type){
        case 'ADD':
            return[
                ...state,
                {
                    id: uuid(),
                    name: action.payload,
                    taskType: 'KIS',
                    completed: false
                }
            ]
      
        case 'ADDPOMO':
            return[
                ...state,
                {
                    id: action.id,
                    name: action.name,
                    taskType: action.taskType,
                    completed: false,
                    usedPomodoroNo: 0
                }
            ]

        case 'UPDATE':
            return state?.map(item => {
                if(item.id === action.id){
                    return ({
                        ...item,
                        usedPomodoroNo: item.usedPomodoroNo + 1
                    })
                }else{
                    return item
                }
            })

        case 'COMPLETE':
            return state?.map(item => {
                    if(item.id === action.payload){
                        return ({
                            ...item,
                            completed: !item.completed
                        })
                    }else{
                        return item
                    }                    
            })
        

        case 'EDIT': 
            return state?.map(item => {
                if(item.id === action.id){
                    return ({
                        ...item,
                        name: action.payload
                    })
                }else{
                    return item
                }
            })

        case 'DELETE': 
            return state?.filter(item => item.id !== action.payload)

        case 'CLEAR' : return []

        default:
            return state
    }
}