import { React, useState } from "react";
import { usePasswordValidation } from "../../hooks/UsePasswordValidation";
import axios from "../../api/axios";

const REGISTER_URL = '/register'
export default function Register() {
  const [firstname, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState({
    firstPassword: "",
    secondPassword: "",
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

  const setFirst = (e) => {
    setPassword({ ...password, firstPassword: e.target.value });
  };
  const setSecond = (e) => {
    setPassword({ ...password, secondPassword: e.target.value });
  };

  const handleSubmit = async (e) => {
    // const hashedPassword = bcrypt.hashSync(password.firstPassword, salt);
    e.preventDefault();
    if (isValid) {
      try {
        console.log(password.secondPassword);
        const response = await axios.post(REGISTER_URL, JSON.stringify({
              username: firstname,
              email: email,
              password: password.secondPassword,
            }), {
              headers: {'Content-Type': 'application/json'},
              withCredentials: true
            });
            console.log(response.data);
            console.log(JSON.stringify(response));

            // clear input fields
      } catch (err) {
        if(!err?.response) {
          console.log(err)

        }
        console.log(err)
      }
    } else {
      console.log("vérifiez la validité du mot de passe");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          value={firstname}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label>
        First Password:
        <input required onChange={setFirst} type="password" />
      </label>
      <label>
        Second Password:
        <input required onChange={setSecond} type="password" />
      </label>
      <label>
        Email:
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
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

      <button type="submit">Je m'inscris</button>
    </form>
  );
}

