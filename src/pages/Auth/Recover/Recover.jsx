import { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../../context/UserContext'
import Input from '../../../components/common/Input/Input'
import Button from '../../../components/common/Button/Button'
import paths from '../../../paths'
import useValidation from '../../../hooks/useValidation'

export default function Recover () {
  const [userEmail, setUserEmail] = useState('')
  const [showValidationError, setShowValidationError] = useState()
  const { emailError, validateEmail } = useValidation()
  const { sendRecoverPasswordEmail } = useContext(UserContext)
  const navigate = useNavigate()

  useEffect(() => {
    validateEmail(userEmail)
  }, [userEmail])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (emailError) {
      setShowValidationError(true)
      return
    }
    sendRecoverPasswordEmail({ email: userEmail })
    navigate(paths.home)
  }

  return (
  <>
    <h2>Send change password email</h2>
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
      <Button>Send email</Button>
    </form>
  </>
  )
}
