import { useState, useContext, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { UserContext } from '../../../context/UserContext'
import Input from '../../../components/common/Input/Input'
import Button from '../../../components/common/Button/Button'
import useServer from '../../../hooks/useServer'

export default function Edit () {
  const [isLoading, setIsLoading] = useState(true)
  const location = useLocation()
  const singleId = location.state
  const [updatedSingle, setUpdatedSingle] = useState({})
  const { isLoggedFromLocal } = useContext(UserContext)
  const { getSingle, editSingle, deleteSingle } = useServer()

  const getSelected = async (recipeID) => {
    if (recipeID) {
      const prevRecipe = await getSingle(recipeID)
      setUpdatedSingle(prevRecipe)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getSelected(singleId)
  }, [])

  const handleSubmitRecipe = (e) => {
    e.preventDefault()
    if (isLoggedFromLocal) {
      editSingle(updatedSingle, singleId)
    }
  }

  const handleSubmitDelete = (e) => {
    e.preventDefault()
    if (isLoggedFromLocal) {
      deleteSingle(singleId)
    }
  }

  return (
    <>
      <h2>Edit recipe</h2>
      { isLoggedFromLocal
        ? singleId
          ? isLoading
            ? <span>Loading</span>
            : <>
            <form onSubmit={handleSubmitRecipe}>
              <Input
                type='text'
                id='Name'
                name='Name'
                onChange={e => setUpdatedSingle({ ...updatedSingle, name: e.target.value })}
                value={updatedSingle?.name}
                label='Name'
                required
              />
              <Input
                type='text'
                id='Description'
                name='Description'
                onChange={e => setUpdatedSingle({ ...updatedSingle, description: e.target.value })}
                value={updatedSingle?.description}
                label='Description'
                required
              />
              <Input
                type='checkbox'
                id='Public'
                name='Public'
                hasLabel={true}
                label='Make public'
                onChange={e => setUpdatedSingle({ ...updatedSingle, isPublic: e.target.checked })}
                checked={updatedSingle?.isPublic}
              />
              <Button>Save</Button>
              </form>
              <form onSubmit={e => handleSubmitDelete(e)}>
                <Button>Delete</Button>
              </form>
            </>
          : <span>You must first select an element to edit</span>
        : <span>You must register or login</span>
    }
    </>
  )
}
