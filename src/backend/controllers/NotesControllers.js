import { collection, deleteDoc, doc, onSnapshot, setDoc, updateDoc } from "firebase/firestore"
import { db } from "../Firebase"


// Get all Notes Data from Database

export function getAllNotesData(collectionRef,user,setState){
    // setLoading(true)
    if(user === undefined) {
    //   setLoading(false)
        return
    }else{
        const unsub = onSnapshot(collection(db, `users/${user?.uid}/${collectionRef}`), (doc) => {
            const dataArr = []
            doc.forEach(item => {
               dataArr.push({...item.data(), id:item.id})
            })
            setState(dataArr)
            // setLoading(false)
        })
        
        return unsub
    }

}

// Get Single note data from database

export function getNoteData(user,docRef,setTitle,setContent){
    // setLoading(true)
    if(user === undefined) {
      // setLoading(false)
        return
    }else{
        const unsub = onSnapshot(doc(db,'users',`${user.uid}`,`AllNotes`,`${docRef}`), (doc) => {
            setTitle(doc.data().title)
            setContent(doc.data().content)
            // setLoading(false)
        })
        
        return unsub
    }

}


// Create a new note
export const createNewNote = async (setLoading,user,collectionRef,docRef,data,navigate ) => {
    setLoading(true)
    try{
      await setDoc(doc(db,'users',`${user?.uid}`,`${collectionRef}`,`${docRef}`), data)
      setLoading(false)
      navigate(`/notes/${docRef}`)
    }catch(error){
      setLoading(false)
      console.log(error)
    }
}

// Update a single note

export const updateNoteData = async (user,docRef,data,setLoading) => {
    setLoading && setLoading(true)
    if(user === undefined){
        return
    }else{
        try{
          await updateDoc(doc(db,'users',`${user?.uid}`,`AllNotes`,`${docRef}`), data)
          setLoading && setLoading(false)
        }catch(error){
          console.log(error)
          setLoading && setLoading(false)
        }    
    }
  }


  // Delete A Single Note
  export const deleteNoteData = async (user,docRef) => {
    try{
      await deleteDoc(doc(db,'users',`${user.uid}`,`AllNotes`,`${docRef}`))
    }catch(error){
      console.log(error)
    }
  }