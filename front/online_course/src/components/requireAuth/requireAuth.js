import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";



const RequireAuth = () => {
    const userRole = 'Student' ;
    const teacherRole = 'Teacher';


    const { auth } = useAuth();
    const location = useLocation();

    // if(auth.user) {
    //     console.log('yes');
    // } else {
    //     console.log('nope')
    // }

    return (
        auth?.roles === userRole || auth?.roles === teacherRole 
            ? <Outlet />
            : <Navigate to='/authentification' state={{ from: location }} replace />
    )
}

export default RequireAuth