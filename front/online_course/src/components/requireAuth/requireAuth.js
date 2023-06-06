import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
const RequireAuth = () => {

    console.log('requireAUTH')

    const { auth } = useAuth();
    const location = useLocation();

    // if(auth.user) {
    //     console.log('yes');
    // } else {
    //     console.log('nope')
    // }

    return (
        auth?.user
            ? <Outlet />
            : <Navigate to='/authentification' state={{ from: location }} replace />
    )
}

export default RequireAuth