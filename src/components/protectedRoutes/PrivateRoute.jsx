import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useAuth } from "../../context"

export const PrivateRoute = () => {
    const {userTocken} = useAuth()
    const location = useLocation()


    return (
        userTocken ? (
            <Outlet/>
        ) : (
            <Navigate to='/login' state={{ from: location }} replace/>
        )
    )
}