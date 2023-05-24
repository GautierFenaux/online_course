import { React, useState } from "react";
import { usePasswordValidation } from "../../../hooks/UsePasswordValidation";
import './subForm.css';
import { FaCheck, FaTimes } from "react-icons/fa";



const Informations = (props) => {
  
  const preventFunc = (e) => e.preventDefault();

  const [password, setPassword] = useState({
    firstPassword: "",
    secondPassword: "",
  });

  const [formData, setFormData] = useState({
    informations: {
      username: "",
      email: "",
      password: "",
    },
  });

  const [
    validLength,
    hasNumber,
    upperCase,
    lowerCase,
    match,
    specialChar,
    isValid,
  ] = usePasswordValidation({
    firstPassword: password.firstPassword,
    secondPassword: password.secondPassword,
  });


  const handleInfo = (e, info) => {
   
    switch (info) {
        case 'username':
            setFormData({
                informations: {
                    ...formData.informations,
                    username: e.target.value
                }
            })
            break;
            case 'firstPass':
            setPassword({ ...password, firstPassword: e.target.value });
            setFormData({
                informations: {
                    ...formData.informations,
                    password: e.target.value
                }
            })
            break;
            case 'secondPass':
            setPassword({ ...password, secondPassword: e.target.value });
            setFormData({
                informations: {
                    ...formData.informations,
                    password: e.target.value
                }
            })
            break;
            case 'email':
            setFormData({
                informations: {
                    ...formData.informations,
                    email: e.target.value
                }
            })
            break;
        default:
            break;
    }
  };

  const checkEmail = (email) => {
     // Regular expression to match email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  // Test the email against the regex
  return emailRegex.test(email);
  }
  
  return (
    <form className="flex-column information-form" onSubmit={preventFunc}>
      <h2>Créer un compte</h2>
      <label>
        Username
        <input type="text" onChange={(e) => handleInfo(e, "username")} />
      </label>
      <label>
        First Password
        <input
          required
          onChange={(e) => handleInfo(e, "firstPass")}
          type="password"
        />
      </label>
      <label>
        Confirm Password
        <input
          required
          onChange={(e) => handleInfo(e, "secondPass")}
          type="password"
        />
      </label>
      <label>
        Email
        <input required type="email" onChange={(e) => handleInfo(e, "email")} />
      </label>

      <div className="passwordCheck-container">
        <ul>
          <li>
            <span>Au moins 8 caractères </span> {validLength ? <FaCheck/> : <FaTimes/>}
          </li>
          <li>
            <span>Possède un chiffre </span> {hasNumber ? <FaCheck/> : <FaTimes/>}
          </li>
          <li>
            <span>Possède un caractère spécial </span>{" "}
            {specialChar ? <FaCheck/> : <FaTimes/>}
          </li>
          <li>
            <span>Possède une lettre majuscule </span> {upperCase ? <FaCheck/> : <FaTimes/>}
          </li>
          <li>
            <span>Possède une lettre minuscule </span> {lowerCase ? <FaCheck/> : <FaTimes/>}
          </li>
          <li><span>Les mots de passe correspondent</span> {match ? <FaCheck/> : <FaTimes/>}</li>
        </ul>
      </div>
      
      <div className="container-btns flex-row-center">
        <button className="button " disabled={isValid && checkEmail(formData.informations.email) ? false : true} onClick={() => props.modifyIndex(2, formData)}>Valider</button>
      </div>
    </form>
  );
};

export default Informations;
