import { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../../context/UserContext'
import useValidation from '../../../hooks/useValidation'
import Input from '../../../components/common/Input/Input'
import Button from '../../../components/common/Button/Button'
import paths from '../../../paths'

export default function Register () {
  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [showValidationError, setShowValidationError] = useState(false)
  const { validateEmail, validatePassword, emailError, passwordError } = useValidation()
  const { userRegister } = useContext(UserContext)

  useEffect(() => {
    validateEmail(userEmail)
  }, [userEmail])

  useEffect(() => {
    validatePassword(userPassword)
  }, [userPassword])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (emailError || passwordError) {
      setShowValidationError(true)
      return
    }
    userRegister({ email: userEmail, password: userPassword })
  }

  return (
    <>
      <h2>Register</h2>
      <form id="form" onSubmit={handleSubmit}>
        <Input
          type='email'
          inputId='userEmail'
          name='userEmail'
          onChange={e => setUserEmail(e.target.value)}
          value={userEmail}
          label='Email'
          autofocus={true}
          autoComplete='email'
          showValidationError={showValidationError}
          showValidationErrorMessage={true}
          validationErrorMessage={emailError}
          required
        />
        <Input
          type='password'
          inputId='userPassword'
          name='userPassword'
          onChange={e => setUserPassword(e.target.value)}
          value={userPassword}
          label='Password'
          autoComplete='new-password'
          showValidationError={showValidationError}
          showValidationErrorMessage={true}
          validationErrorMessage={passwordError}
          togglePasswordVisibility={true}
          showInfoBullet={true}
          infoMessage='Password must be between 8 and 32 characters long, and must contain at least one lower case and one upper case letters, and one number.'
          required
        />
        <Button>Register</Button>
      </form>
      <Link to={paths.userRecoverPassword}>Recover Password</Link>
    </>
  )
}
