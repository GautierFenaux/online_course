import React from 'react'
import axios from "../../../api/axios";
import './subForm.css' ;


const REGISTER_URL = '/register'
const ValidationStep = ({data}) => {
  
 
  const {level, styles, informations} = data ;
  
  const handleSubmit = async () => {
      try {
        const response = await axios.post(REGISTER_URL, JSON.stringify({
              username: informations.username,
              email: informations.email,
              password: informations.password,
              level: level,
              styles: styles
            }), {
              headers: {'Content-Type': 'application/json'},
              withCredentials: true
            });
            console.log(response.data);
            console.log(JSON.stringify(response));
      } catch (err) {
        if(!err?.response) {
            console.log('Err:', err);
        }
      }
  };

  const handleButtonClick = () => {
    handleSubmit(); 
  };


  return ( 
    <form>
      <p>Cliquez sur le bouton ci-dessous pour valider votre inscription</p>
      <div className="container-btns">
        <button type="button" className="prev">
          Précédent
        </button>
        <button onClick={handleButtonClick}>Valider</button>
      </div>
    </form>
  );
}

export default ValidationStep