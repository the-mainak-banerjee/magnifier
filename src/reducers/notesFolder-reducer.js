export const notesFolderReducer = (state,action) => {
    switch(action.type) {
        case 'DELETE': 
            return (
                state?.filter(item => item.id !== action.id)
            )
        
        case 'DELETENOTE': 
                return state?.map(item => {
                    if(item.id === action.folderId){
                        return ({...item, notes:item.notes?.filter(data => data.id !== action.fileId)})
                    }else{
                        return item
                    }
                })
        
        default:
            return state
    }
}