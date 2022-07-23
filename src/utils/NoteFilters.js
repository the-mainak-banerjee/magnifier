const getFoldersNotes = (folderId,notes) => {
    if(folderId === null){
        return notes
    }else{
        return notes?.filter(item => item.folderId === folderId)
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

export {getFoldersNotes, getOthersNote, getPinnedNotes, getUnPinnedNotes, getArchivedNotes, getTrashedNotes}

