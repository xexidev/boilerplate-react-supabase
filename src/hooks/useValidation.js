import { useState } from 'react'

export default function useValidation () {
  const [emailError, setEmailError] = useState(null)
  const [passwordError, setPasswordError] = useState(null)

  const validateEmail = (email) => {
    if (email.length <= 0) {
      setEmailError('You have to provide an email')
      return
    }
    const regexEmailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!regexEmailFormat.test(email)) {
      setEmailError('Please enter a valid email')
      return
    }
    setEmailError(null)
  }

  const validatePassword = (password) => {
    if (password.length < 8 || password.length > 32) {
      setPasswordError('Password must be between 8 and 32 characters')
      return
    }
    if (/\s/g.test(password)) {
      setPasswordError('Password must not contain whitespaces')
      return
    }
    const regexAsciiValues = /^[!\"#\$%&'()*+,\-.\/0-9:;<=>?@A-Z\[\]^_`a-z\{\|\}~]*$/
    if (!regexAsciiValues.test(password)) {
      const found = new Set()
      Array.from(password).forEach(char => {
        if (!char.match(regexAsciiValues)) {
          found.add(' ' + char)
        }
      })
      const foundArr = Array.from(found)
      setPasswordError(`Character${foundArr.length > 1 ? 's' : ''} ${foundArr.toString()} ${foundArr.length > 1 ? 'are' : 'is'} not allowed`)
      return
    }
    const regexUpperLowerNumber = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+/
    if (!regexUpperLowerNumber.test(password)) {
      setPasswordError('Password must contain at least a number, a lowercase and a uppercase letter')
      return
    }
    setPasswordError(null)
  }

  return {
    emailError,
    passwordError,
    validateEmail,
    validatePassword
  }
}
