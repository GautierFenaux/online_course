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
        console.log(response.data.token)
        return {...prev, 
            roles: response.data.roles,
            accessToken: response.data.accessToken,
            id: response.data.id
        }
    })
    return response.data.accessToken ;
  }
  
    return refresh ;
  
}

