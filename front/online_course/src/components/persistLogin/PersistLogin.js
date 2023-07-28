import React from 'react';
import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useRefreshToken } from '../../hooks/useRefreshToken';
import useAuth from '../../hooks/useAuth';
import Dashboard from '../dashboard/Dashboard';

const PersistLogin = ({children}) => {

    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth } = useAuth();

    console.log(children)

    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                await refresh();
                
            }
            catch (err) {
                console.error(err);
                console.log('encore ici')
            }
            finally {
                setIsLoading(false);
            }
        }
        !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
    }, [auth?.accessToken])

    // useEffect(() => {
    //     console.log(`isLoading: ${isLoading}`);
    //     // console.log(`at: ${JSON.stringify(auth?.accessToken)}`);
    // }, [isLoading])



  return (
    <>
    {isLoading ? <p>Loading...</p> : <Dashboard/>}
    </>
  )
}

export default PersistLogin



// import React, { useState, useEffect } from 'react';
// import { useRefreshToken } from '../../hooks/useRefreshToken';
// import useAuth from '../../hooks/useAuth';

// const PersistLogin = ({ children }) => {
//   const [isLoading, setIsLoading] = useState(true);
//   const refresh = useRefreshToken();
//   const { auth } = useAuth();

//   useEffect(() => {
//     const verifyRefreshToken = async () => {
//       try {
//         await refresh();
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
//   }, [auth?.accessToken]);

//   return isLoading ? <p>Loading...</p> : children;
// };

// export default PersistLogin;
