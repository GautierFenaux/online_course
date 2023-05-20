import { useState, useEffect } from "react"

export const usePasswordValidation = ({
  firstPassword = "",
  secondPassword = "",
  requiredLength = 8,
}) => {
  const [validLength, setValidLength] = useState(null)
  const [hasNumber, setHasNumber] = useState(null)
  const [upperCase, setUpperCase] = useState(null)
  const [lowerCase, setLowerCase] = useState(null)
  const [specialChar, setSpecialChar] = useState(null)
  const [match, setMatch] = useState(null)
  const [isValid, setIsValid] = useState(false)

  useEffect(() => {
    setValidLength(firstPassword.length >= requiredLength ? true : false)
    setUpperCase(firstPassword.toLowerCase() !== firstPassword)
    setLowerCase(firstPassword.toUpperCase() !== firstPassword)
    setHasNumber(/\d/.test(firstPassword))
    setSpecialChar(/[ `!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/.test(firstPassword))
    setMatch(firstPassword && firstPassword === secondPassword)
  }, [firstPassword, secondPassword]);
  // a chaque fois qu'un élément du second argument est changé il rend le composant.
  useEffect(() => {
    if (validLength && hasNumber && upperCase && lowerCase && specialChar && match) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [validLength, hasNumber, upperCase, lowerCase, specialChar, match]);

  return [validLength, hasNumber, upperCase, lowerCase, match, specialChar, isValid];
};
