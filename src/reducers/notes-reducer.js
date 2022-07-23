export const notesReducer = (state,action) => {
    switch(action.type) {
        
        case 'PIN':
            return state?.map(item => {
                if(item.id === action.id) {
                    return ({...item, isPinned: !item.isPinned})
                }else{
                    return item
                }
            })


        case 'ARCHIVE': 
            return state?.map(item => {
                if(item.id === action.id){
                    return ({...item, isArchived: !item.isArchived})
                }else{
                    return item
                }
        })


        case 'TRASH': 
            return state?.map(item => {
                if(item.id === action.id){
                    return ({...item, isTrashed: !item.isTrashed})
                }else{
                    return item
                }
        })


        case 'DELETE':
            return state?.filter(item => item.id !== action.id)
        


        default: 
            return state
    }
}