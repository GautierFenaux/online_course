import React from 'react'
import MyCalendar from './calendar/MyCalendar'
import useLogout from '../../hooks/useLogout'
import { useNavigate } from 'react-router-dom'

// retourner le dashboard de l'utilisateur
const Dashboard = () => {
   
  const navigate = useNavigate();
  const logout = useLogout();


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