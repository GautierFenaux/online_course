import axios from '../api/axios'
import useAuth from './useAuth';



export const useRefreshToken = () => {
  const {auth, setAuth} = useAuth();
  
  const refresh = async () => {
    const response = await axios.get('/refresh', {
        withCredentials : true,
        headers: {
          'Content-Type': 'application/json',
        },
        refreshToken : `${auth.refreshToken}`,
        
    });
    setAuth(prev => {
        // console.log(response.data.accessToken)
        return {...prev, 
            roles: response.data.roles,
            accessToken: response.data.accessToken 
        }
    })
    return response.data.accessToken ;
  }
  
    return refresh ;
  
}

