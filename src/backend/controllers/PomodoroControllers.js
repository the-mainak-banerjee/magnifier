import { doc, onSnapshot, setDoc } from "firebase/firestore"
import { db } from "../Firebase"

// Create a new note
export const addPomodoroData = async (user,collectionRef,docRef,data) => {
    try{
      await setDoc(doc(db,'users',`${user?.uid}`,`${collectionRef}`,`${docRef}`), data)
    }catch(error){
      console.log(error)
    }
}


// Get each day pomodoro data
export function getPerDayPomoData(user,docRef,setTotalPomo){
    // setLoading(true)
    if(user === undefined) {
      // setLoading(false)
        return
    }else{
        const unsub = onSnapshot(doc(db,'users',`${user.uid}`,`PomoData`,docRef), (doc) => {
            setTotalPomo(doc.data())
            // setLoading(false)
        })
    // console.log(docRef)
        return unsub
    }

}