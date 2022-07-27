import { createContext, useContext, useEffect, useReducer, useState } from "react"
import { useLocation, useSearchParams } from "react-router-dom"
import  { v4 as uuid } from 'uuid'
import { getAllFolders } from "../backend/controllers/FolderControllers"
import { getAllNotesData } from "../backend/controllers/NotesControllers"
import { notesReducer } from "../reducers/notes-reducer"
import { notesFolderReducer } from "../reducers/notesFolder-reducer"
import { getArchivedNotes, getPinnedNotes, getTrashedNotes, getOthersNote, getUnPinnedNotes, getFoldersNotes, getUserSearchedNotes } from "../utils/NoteFilters"
import { useAuth } from "./auth-context"

const NotesContext = createContext()

const initialNotes = [
    {
        id:'68da0057-045d-498a-bdf7-fa844ad95d78',
        title: 'Magnifier Details',
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        isPinned: false,
        isArchived: false,
        isSelected: false,
        isTrashed: false,
        folderId: '3e4724d8-32c7-420e-82c9-1d0948bea7b0'
    },
    {
        id:'e37f0646-b0aa-4c8f-9aac-0dedb9c07914',
        title: 'My New Test Note',
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        isPinned: false,
        isArchived: false,
        isSelected: false,
        isTrashed: false,
        folderId: '3e4724d8-32c7-420e-82c9-1d0948bea7b0'
    },
    {
        id:uuid(),
        title: 'My Details',
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        isPinned: false,
        isArchived: false,
        isSelected: false,
        isTrashed: false,
        folderId: null
    },
    {
        id:uuid(),
        title: '',
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur",
        isPinned: false,
        isArchived: false,
        isSelected: false,
        isTrashed: false,
        folderId: null
    },
    {
        id:uuid(),
        title: 'Habit Tracking',
        content: "Lorem ipsum dolor sit amet.",
        isPinned: false,
        isArchived: false,
        isSelected: false,
        isTrashed: false,
        folderId: null
    },
    {
        id:uuid(),
        title: '',
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        isPinned: true,
        isArchived: false,
        isSelected: false,
        isTrashed: false,
        folderId: null
    },
    {
        id:uuid(),
        title: 'Magnifier Details',
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        isPinned: false,
        isArchived: false,
        isSelected: false,
        isTrashed: false,
        folderId: null
    },
    {
        id:'8033e74f-45f7-4641-8ba7-807e53b52b6f',
        title: 'Magnifier Details',
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        isPinned: false,
        isArchived: false,
        isSelected: false,
        isTrashed: false,
        folderId: 'b7cf7e61-34cd-430e-bc8e-fc2f0bfede3d'
    },
    {
        id:"0dcbe343-624e-4864-876f-04d74f900d04",
        title: 'Magnifier Details',
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        isPinned: false,
        isArchived: false,
        isSelected: false,
        isTrashed: false,
        folderId: 'b7cf7e61-34cd-430e-bc8e-fc2f0bfede3d'
    },
    {
        id:"fe148288-366b-44ba-b6c1-cbaa7582ff8b",
        title: 'Magnifier Details',
        content: "Test Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        isPinned: false,
        isArchived: false,
        isSelected: false,
        isTrashed: false,
        folderId: 'b7cf7e61-34cd-430e-bc8e-fc2f0bfede3d'
    }
]

const initialFolders = [
    {
        id: '3e4724d8-32c7-420e-82c9-1d0948bea7b0',
        name: 'Magnifier',
        notes:['68da0057-045d-498a-bdf7-fa844ad95d78','e37f0646-b0aa-4c8f-9aac-0dedb9c07914'],
        isSelected: false,
        isPinned: false
    },
    {
        id: 'b7cf7e61-34cd-430e-bc8e-fc2f0bfede3d',
        name: 'Magnifier',
        notes:['8033e74f-45f7-4641-8ba7-807e53b52b6f',"0dcbe343-624e-4864-876f-04d74f900d04","fe148288-366b-44ba-b6c1-cbaa7582ff8b"],
        isSelected: false,
        isPinned: false
    },
]

const NotesContextProvider =({ children }) => {

    const [allNotes, notesDispatch] = useReducer(notesReducer,initialNotes)
    const [allFolder,foldersDispatch] = useReducer(notesFolderReducer,initialFolders)

    const [allNote,setAllNote] = useState([])
    const [allFolders,setAllFolders] = useState([])
    const [currentFolder,setCurrentFolder] = useState('')

    const [searchParams] = useSearchParams()
    const location = useLocation()

    const [userSearchTerm,setUserSearchTerm] = useState('')

    const [selectState, setSelectState] = useState(false)
    const [selectedNotes,setSelectedNotes] = useState([])

    const [onTrashPage,setOnTrashPage] = useState(false)
    const [onArchivePage,setOnArchivePage] = useState(false)

    const { user } = useAuth()
    const param = searchParams.get('q')


    // Clearing the search term if page changes
    useEffect(()=> {
        setUserSearchTerm('')
    },[location])


    // Maintaining the selected state.
    useEffect(() => {
        if(allNote.some(item => item.isSelected)){
            setSelectState(true)
        }else{
            setSelectState(false)
        }
    },[allNote])

    
    // Finding The Location Of User
    useEffect(() => {
        location.pathname === '/notes/trash' ? setOnTrashPage(true) : setOnTrashPage(false)
        location.pathname === '/notes/archive' ?  setOnArchivePage(true) :  setOnArchivePage(false)
    }, [location])


    // Get All Notes from Database
    useEffect(() => {        
        const unSub = getAllNotesData('AllNotes', user, setAllNote)
        
        return () => unSub && unSub()
    },[user])

    // Get All Folders from Database
    useEffect(() => {        
        const unSub = getAllFolders('NotesFolder', user, setAllFolders)
        
        return () => unSub && unSub()
    },[user])


    // Get Current Folder
    useEffect(() => {
        setCurrentFolder(allFolders?.find(item => item.id === param))
    }, [param,allFolders])



    // Filtering The Notes to show into different pages
    const userSearchedNotes = getUserSearchedNotes(userSearchTerm,allNote)
    const foldersNotes = getFoldersNotes(param, userSearchedNotes)
    const othersNote = getOthersNote(foldersNotes)
    const pinnedNotes = getPinnedNotes(othersNote)
    const unPinnedNotes = getUnPinnedNotes(othersNote)
    const archivedNotes = getArchivedNotes(userSearchedNotes)
    const trashedNotes = getTrashedNotes(userSearchedNotes)


    return (
        <NotesContext.Provider
            value = {{allNote, allNotes, notesDispatch, othersNote, pinnedNotes, unPinnedNotes, archivedNotes, trashedNotes, allFolders,allFolder, foldersDispatch, userSearchTerm, setUserSearchTerm, selectState, setSelectState, selectedNotes,setSelectedNotes, onTrashPage,onArchivePage, currentFolder}}
        >
            {children}
        </NotesContext.Provider>
    )
}

const useNotes = () => useContext(NotesContext)

export { NotesContextProvider, useNotes }