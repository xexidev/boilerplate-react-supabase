import { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../../context/UserContext'
import Input from '../../../components/common/Input/Input'
import Button from '../../../components/common/Button/Button'
import paths from '../../../paths'
import useValidation from '../../../hooks/useValidation'

export default function Reset () {
  const [userPassword, setUserPassword] = useState('')
  const [showValidationError, setShowValidationError] = useState(false)
  const { passwordError, validatePassword } = useValidation()
  const { resetPassword } = useContext(UserContext)
  const navigate = useNavigate()

  useEffect(() => {
    validatePassword(userPassword)
  }, [userPassword])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (passwordError) {
      setShowValidationError(true)
      return
    }
    resetPassword({ password: userPassword })
    navigate(paths.home)
  }

  return (
  <>
    <h2>Reset Password</h2>
    <form id="form" onSubmit={handleSubmit}>
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
      <Button>Reset password</Button>
    </form>
  </>
  )
}
