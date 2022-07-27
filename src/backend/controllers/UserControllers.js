import { doc, setDoc, updateDoc } from "firebase/firestore"
import { db } from "../Firebase"

// Create a new user database
export const createUser = async (docRef,data) => {
    try{
        await setDoc(doc(db,'users', `${docRef}`),data)
    }catch(error){
        console.log(error)
    }
}

// Update User Database
export const updateUser = async (docRef,data) => {
    try{
        await updateDoc(doc(db, 'users', `${docRef}`), data)
    }catch(error){
        console.log(error)
    }
}