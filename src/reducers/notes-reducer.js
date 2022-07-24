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
                    return ({...item, isArchived: !item.isArchived, isSelected: false})
                }else{
                    return item
                }
        })


        case 'TRASH': 
            return state?.map(item => {
                if(item.id === action.id){
                    return ({...item, isTrashed: !item.isTrashed, isSelected: false})
                }else{
                    return item
                }
        })


        case 'SELECT': 
            return state?.map(item => {
                if(item.id === action.id){
                    return ({...item, isSelected: !item.isSelected})
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