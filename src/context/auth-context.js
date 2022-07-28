import { createContext, useContext, useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut,  } from 'firebase/auth'
import { auth } from '../backend/Firebase'
import { createUser } from "../backend/controllers/UserControllers"
import { useToast } from "@chakra-ui/react"

let autoLogoutTimer;

const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {

    const localTocken = (localStorage.getItem('userId'))

    const [user,setUser] = useState()
    const [userTocken,setUserTocken] = useState(localTocken)
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const toast = useToast()
    const from = location.state?.from?.pathname || '/kis'


      // LogOut Function

      const logOut = async () => {
        await signOut(auth)
        setUserTocken(null)
        localStorage.removeItem('userId')
        navigate('/login', { replace: true})  
        if(autoLogoutTimer){
            clearTimeout(autoLogoutTimer)
        }
    }


    // Signup Function
    const signUp = async (fullName,email,password) => {
        setLoading(true)
        try{
            const userCredentials = await createUserWithEmailAndPassword(auth,email,password)
    
            navigate('/kis', {replace: true})
            setUserTocken(userCredentials.user.accessToken)
            localStorage.setItem('userId', JSON.stringify(userCredentials.user.accessToken))

            autoLogoutTimer = setTimeout(logOut,3600000)

            createUser(userCredentials.user.uid, {
                userId: userCredentials.user.uid,
                name: fullName,
                email: email,
                pomoDoroTask:{},
                dateCreated: Date.now()
            })
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
        }finally{
            setLoading(false)
        }
    }

    
    
    
    // LogIn Function
    
    const logIn = async (email,password) => {
        setLoading(true)
        try{
            const userCredentials = await signInWithEmailAndPassword(auth,email,password)
            navigate(from, {replace: true})
            setLoading(false)
            setUserTocken(userCredentials.user.accessToken)
            localStorage.setItem('userId', JSON.stringify(userCredentials.user.accessToken))
            autoLogoutTimer = setTimeout(logOut,3600000)
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
        <AuthContext.Provider value={{ signUp,logIn,logOut,user,loading,userTocken }}>
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