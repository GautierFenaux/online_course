import React, {useRef, useState, useEffect, useContext}from 'react';
import './authentification.css';
import  AuthContext  from '../../context/AuthProvider';
import axios from '../../api/axios';

const LOGIN_URL = '/auth'
const Authentification = () => {

  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(LOGIN_URL,
        JSON.stringify({username: user, password: pwd}), {
          headers: {'Content-Type': 'application/json'},
          withCredentials: true
        });

        console.log(JSON.stringify(response.data));
        const token = response?.data?.token;
        const roles = response?.data?.roles;
        const refreshToken = response?.data?.refresh_token;
        setAuth({user, pwd, roles, token, refreshToken})
      setUser("");
      setPwd("");
      setSuccess(true);
    } catch (err) {
      if(!err?.response) {
        setErrMsg('No server response');
      } else if (err.response?.status === 400) {
        setErrMsg('Missing Username or Password');
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized') ;
      } else {
        setErrMsg('Login Failed');
      }
      errRef.current.focus();
    }
  };
    
  // rediriger vers le dashboard
  return (
    <>
      {success ? (
        <section>
          <h1>You are logged in! </h1>
          <br />
        
        </section>
      ) : (
        <section>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          ></p>
          <h1>Se connecter</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Nom d'utilisateur :</label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
            />

            <label htmlFor="password">Mot de passe :</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
            />
            <button>Se connecter</button>
            <span className="line">
              {" "}
              {/* <a href="#">Créer un compte</a> */}
            </span>
          </form>
        </section>
      )}
    </>
  );
}


export default Authentification