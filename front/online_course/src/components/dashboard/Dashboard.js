import React, { useContext } from 'react'
import MyCalendar from './calendar/MyCalendar'
import useLogout from '../../hooks/useLogout'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import PersistLogin from '../persistLogin/PersistLogin'


// retourner le dashboard de l'utilisateur
const Dashboard = () => {
   
  const navigate = useNavigate();
  const logout = useLogout();
  const { accessToken } = useAuth();
  
    const signOut = async () => {
      await logout();
      navigate('/');
    }

  return (
  
    <section>
   
      <button onClick={signOut}>Se déconnecter</button>
      <MyCalendar />
     
    </section>
  )
}

export default Dashboard