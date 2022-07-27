import { doc, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../backend/Firebase'

function useActiveUser(userId) {
  const [accountDetails, setAccountDetails] = useState()

  useEffect(() => {
        const docRef = doc(db, 'users', `${userId}`)
        const unsub = onSnapshot(docRef, (doc) => {
          setAccountDetails(doc.data())
        })

        return () => unsub()
  },[userId])


  return (
      {
        accountDetails,
    }
  )
}

export default useActiveUser