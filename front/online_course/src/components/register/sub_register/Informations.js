import { React, useState } from "react";
import { usePasswordValidation } from "../../../hooks/UsePasswordValidation";

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
  console.log(formData.informations.email)
  return (
    <form onSubmit={preventFunc}>
      <label>
        Username:
        <input type="text" onChange={(e) => handleInfo(e, "username")} />
      </label>
      <label>
        First Password:
        <input
          required
          onChange={(e) => handleInfo(e, "firstPass")}
          type="password"
        />
      </label>
      <label>
        Second Password:
        <input
          required
          onChange={(e) => handleInfo(e, "secondPass")}
          type="password"
        />
      </label>
      <label>
        Email:
        <input required type="email" onChange={(e) => handleInfo(e, "email")} />
      </label>

      <div>
        <ul>
          <li>
            Valid Length: {validLength ? <span>True</span> : <span>False</span>}
          </li>
          <li>
            Has a Number: {hasNumber ? <span>True</span> : <span>False</span>}
          </li>
          <li>
            UpperCase: {upperCase ? <span>True</span> : <span>False</span>}
          </li>
          <li>
            LowerCase: {lowerCase ? <span>True</span> : <span>False</span>}
          </li>
          <li>Match: {match ? <span>True</span> : <span>False</span>}</li>
          <li>
            Special Character:{" "}
            {specialChar ? <span>True</span> : <span>False</span>}
          </li>
          <li>isValid : {isValid ? <span>True</span> : <span>False</span>}</li>
        </ul>
      </div>
      
      <div className="container-nav-btns">
        <button disabled={isValid && checkEmail(formData.informations.email) ? false : true} onClick={() => props.modifyIndex(2, formData)}>Valider</button>
      </div>
    </form>
  );
};

export default Informations;
