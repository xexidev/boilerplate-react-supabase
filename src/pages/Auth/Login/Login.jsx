import { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../../context/UserContext'
import Input from '../../../components/common/Input/Input'
import Button from '../../../components/common/Button/Button'
import paths from '../../../paths'
import useValidation from '../../../hooks/useValidation'

export default function Login () {
  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [showValidationError, setShowValidationError] = useState(false)
  const { emailError, passwordError, validateEmail, validatePassword } = useValidation()
  const { userLogin } = useContext(UserContext)

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
    userLogin({ email: userEmail, password: userPassword })
  }

  return (
  <>
    <h2>Login</h2>
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
          autoComplete='current-password'
          showValidationError={showValidationError}
          showValidationErrorMessage={true}
          validationErrorMessage={passwordError}
          togglePasswordVisibility={true}
          required
        />
      <Button>Login</Button>
    </form>
    <Link to={paths.userRecoverPassword}>Recover Password</Link>
  </>
  )
}
