import { collection, doc, onSnapshot, setDoc, updateDoc, deleteDoc, orderBy, query } from "firebase/firestore"
import { db } from "../Firebase"
import { v4 as uuid } from 'uuid'




// Read Real Time data from Firebase

export function getData(collectionRef,user,setState,setLoading){
    setLoading && setLoading(true)
    if(user === undefined) {
      setLoading && setLoading(false)
        return
    }else{
        const unsub = onSnapshot(query(collection(db, `users/${user?.uid}/${collectionRef}`),orderBy('timeStamp', 'asc')) , (querySnapshot) => {
            // const dataArr = []
            // doc.forEach(item => {
            //    dataArr.push({...item.data(), id:item.id})
            // })
            const tasks = querySnapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            }))
            setState(tasks)
            setLoading && setLoading(false)
        })
        
        return unsub
    }

}


// Add data in Database

export const addData = async (setLoading,user,collectionRef,data, docRef = uuid()) => {
    setLoading(true)
    try{
      await setDoc(doc(db,'users',`${user.uid}`,`${collectionRef}`,`${docRef}`), data)
      setLoading(false)
    }catch(error){
      setLoading(false)
      console.log(error)
    }
}


// Update data in Database

export const updateData = async (user,collectionRef,docRef,data) => {
    try{
      await updateDoc(doc(db,'users',`${user.uid}`,`${collectionRef}`,`${docRef}`), data)
    }catch(error){
      console.log(error)
    }
  }


  // Delete data from Database

  export const deleteData = async (user,collectionRef,docRef) => {
    try{
      await deleteDoc(doc(db,'users',`${user.uid}`,`${collectionRef}`,`${docRef}`))
    }catch(error){
      console.log(error)
    }
  }