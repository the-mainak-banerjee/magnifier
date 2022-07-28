import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useAuth } from "../../context"

export const RestrictedRoute = () => {
    const {userTocken} = useAuth()
    const location = useLocation()

    const from = location.state?.from?.pathname || '/kis'

    return (
        userTocken ? (
            <Navigate to={from} state={{ from: location }} replace/>
        ) : (
            <Outlet/>
        )
    )

}