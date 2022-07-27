import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut,  } from 'firebase/auth'
import { auth } from '../backend/Firebase'
import { createUser } from "../backend/controllers/UserControllers"
import { useToast } from "@chakra-ui/react"


const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {

    const date = useMemo(() => {
        return new Date()
    }, [])

    const [user,setUser] = useState()
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate()
    const toast = useToast()

    // Signup Function
    const signUp = async (fullName,email,password) => {
        setLoading(true)
        try{
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
            setLoading(false)
            return userCredentials
        }catch(error){
            if(error.code === 'auth/email-already-in-use'){
                toast({
                    title: 'Email Already Exists.Please Use A Different Email',
                    status: 'error'
                })
            }else{
                toast({
                    title: error.message,
                    status: 'error'
                })
            }
            setLoading(false)
        }
    }

    
    
    
    // LogIn Function
    
    const logIn = async (email,password) => {
        setLoading(true)
        try{
            const userCredentials = await signInWithEmailAndPassword(auth,email,password)
            navigate('/kis', {replace: true})
            setLoading(false)
            return userCredentials
        }catch(error){
            if(error.code === 'auth/user-not-found'){
                toast({
                    title: 'Invalid Login Credenials',
                    status: 'error'
                })
            }else if(error.code === 'auth/wrong-password'){
                toast({
                    title: 'You entered wrong password.',
                    status: 'error'
                })
            }else{
                toast({
                    title: 'An error occured.',
                    status: 'error'
                })
            }
            setLoading(false)
        }
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
        <AuthContext.Provider value={{ signUp,logIn,logOut,user,loading }}>
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