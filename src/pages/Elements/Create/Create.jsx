import { useState, useContext } from 'react'
import { UserContext } from '../../../context/UserContext'
import Input from '../../../components/common/Input/Input'
import Button from '../../../components/common/Button/Button'
import useServer from '../../../hooks/useServer'

export default function Create () {
  const [newSingle, setNewSingle] = useState({ name: '', description: '', isPublic: true })
  const { isLoggedFromLocal } = useContext(UserContext)
  const { createSingle } = useServer()

  const handleSubmitRecipe = (e) => {
    e.preventDefault()
    if (isLoggedFromLocal) {
      createSingle(newSingle)
    }
  }

  return (
    <>
      <h2>Create</h2>
      { isLoggedFromLocal
        ? <>
          <form onSubmit={handleSubmitRecipe}>
            <Input
              type='text'
              id='Name'
              name='Name'
              onChange={e => setNewSingle({ ...newSingle, name: e.target.value })}
              value={newSingle.name}
              label='Name'
              required
            />
            <Input
              type='text'
              id='Description'
              name='Description'
              onChange={e => setNewSingle({ ...newSingle, description: e.target.value })}
              value={newSingle.description}
              label='Description'
              required
            />
            <Input
              type='checkbox'
              id='Public'
              name='Public'
              hasLabel={true}
              label='Make public'
              checked={newSingle.isPublic}
              onChange={e => setNewSingle({ ...newSingle, isPublic: e.target.checked })}
            />
            <Button>Save</Button>
          </form>
        </>
        : <span>You must register or login</span>
    }
    </>
  )
}
