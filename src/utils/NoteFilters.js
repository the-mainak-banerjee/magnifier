const getFoldersNotes = (folderId,notes) => {
    if(folderId === null){
        return notes
    }else{
        return notes?.filter(item => item.folderId === folderId)
    }
}

const getUserSearchedNotes = (searchTerm,notes) => {
    if(searchTerm){
        return notes.filter(item => item.content.toLowerCase().includes(searchTerm.toLowerCase()) || item.title.toLowerCase().includes(searchTerm.toLowerCase()))
    }else{
        return notes
    }
}

const getOthersNote = (notes) => {
    return notes?.filter(item => !item.isArchived && !item.isTrashed)
}

const getPinnedNotes = (notes) => {
    return notes?.filter(item => item.isPinned)
}

const getUnPinnedNotes = (notes) => {
    return notes?.filter(item => !item.isPinned)
}

const getArchivedNotes = (notes) => {
    return notes?.filter(item => item?.isArchived && !item.isTrashed)
}

const getTrashedNotes = (notes) => {
    return notes?.filter(item => item.isTrashed)
}

export {getFoldersNotes, getOthersNote, getPinnedNotes, getUnPinnedNotes, getArchivedNotes, getTrashedNotes,getUserSearchedNotes}

