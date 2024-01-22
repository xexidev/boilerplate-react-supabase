import { UserContext } from '../../context/UserContext'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/common/Button/Button'
import Input from '../../components/common/Input/Input'
import useServer from '../../hooks/useServer'
import paths from '../../paths'

export default function UserAccount () {
  const [isDeletingRecipes, setIsDeletingRecipes] = useState(false)
  const { isLoggedFromLocal, userLogout, deleteUser, userID } = useContext(UserContext)
  const { deleteAllUserRecipes } = useServer()
  const navigate = useNavigate()

  const handleDeleteUser = async (e) => {
    e.preventDefault()
    if (isDeletingRecipes) {
      await deleteAllUserRecipes(userID)
    }
    await deleteUser()
    await userLogout()
    navigate(paths.home)
  }

  return (
    <>
      { isLoggedFromLocal
        ? <>
            <h2>Your Account</h2>
            <h3>Delete your account</h3>
            <form onSubmit={e => handleDeleteUser(e)}>
              <Input type='checkbox' label='Delete my recipes too' onChange={e => setIsDeletingRecipes(e.target.checked)} />
              <Button>Delete my account</Button>
            </form>
          </>
        : <h2>Your must Login or Register</h2>
      }
    </>
  )
}
