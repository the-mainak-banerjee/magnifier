import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut,  } from 'firebase/auth'
// import { doc, setDoc } from "firebase/firestore"
import { auth } from '../backend/Firebase'
import { createUser } from "../backend/controllers/UserControllers"


const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {

    const date = useMemo(() => {
        return new Date()
    }, [])

    const [user,setUser] = useState()
    const navigate = useNavigate()

    // Signup Function
    const signUp = async (fullName,email,password) => {
        const userCredentials = await createUserWithEmailAndPassword(auth,email,password)

        navigate('/kis', {replace: true})

        createUser(userCredentials.user.uid, {
            userId: userCredentials.user.uid,
            name: fullName,
            email: email,
            totalPomoOfTheDay: {date:date.getDate() ,short:0, medium:0},
            pomoDoroTask:{},
            dateCreated: Date.now()
        })

        // await setDoc(doc(db,'users', `${userCredentials.user.uid}`),{
        //     userId: userCredentials.user.uid,
        //     name: fullName,
        //     email: email,
        //     dateCreated: Date.now()
        // })
        return userCredentials
    }

    
    
    
    // LogIn Function
    
    const logIn = async (email,password) => {
        const userCredentials = await signInWithEmailAndPassword(auth,email,password)
        navigate('/kis', {replace: true})
        return userCredentials
    }


    // LogOut Function

    const logOut = async () => {
        await signOut(auth)
        navigate('/login', { replace: true})  
    }


    // Get Currently Signedin User

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if(currentUser){
                setUser(currentUser);
            }else {
                setUser('')
            }
        });
        return () => {
          unsubscribe();
        };
    },[]);


    return (
        <AuthContext.Provider value={{ signUp,logIn,logOut,user }}>
            { children }
        </AuthContext.Provider>
    )
}

const useAuth = () => useContext(AuthContext)

export { AuthContextProvider, useAuth }





/*
    1. Auth
    2. Create, Update, Get All KIS and update individual KIS
    3. Create, update, Get Pomodoro Stats
*/