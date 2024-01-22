import supabase from '../services/supabase'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { NotificationsContext } from '../context/NotificationsContext'
import { useNavigate } from 'react-router-dom'
import paths from '../paths'

export default function useServer () {
  const { getUserFromServer, isLoggedFromLocal, userIdFromLocal } = useContext(UserContext)
  const { setNotification } = useContext(NotificationsContext)
  const navigate = useNavigate()

  const getList = async () => {
    if (isLoggedFromLocal) {
      const user = await getUserFromServer()
      if (user) {
        try {
          const { data, error } = await supabase
            .from(import.meta.env.VITE_USER_TABLE)
            .select('*')
            .or(`isPublic.eq.true,user_id.eq.${user.id}`)
          if (error) {
            setNotification({ message: error.message, type: 'error' })
          } else {
            return data
          }
        } catch (error) {
          setNotification({ message: error.message, type: 'error' })
        }
      } else {
        setNotification({ message: 'User not found on server', type: 'error' })
      }
    } else {
      try {
        const { data, error } = await supabase
          .from(import.meta.env.VITE_USER_TABLE)
          .select('*')
          .eq('isPublic', true)
        if (error) {
          setNotification({ message: error.message, type: 'error' })
        } else {
          return data
        }
      } catch (error) {
        setNotification({ message: error.message, type: 'error' })
      }
    }
  }

  const getCreated = async () => {
    const user = await getUserFromServer()
    if (user) {
      try {
        const { data, error } = await supabase
          .from(import.meta.env.VITE_USER_TABLE)
          .select('*')
          .eq('user_id', user.id)
        if (error) {
          setNotification({ message: error.message, type: 'error' })
        } else {
          return data
        }
      } catch (error) {
        setNotification({ message: error.message, type: 'error' })
      }
    } else {
      setNotification({ message: 'User not found on server', type: 'error' })
    }
  }

  const getSingle = async (id) => {
    if (isLoggedFromLocal) {
      const user = await getUserFromServer()
      if (user) {
        try {
          const { data, error } = await supabase
            .from(import.meta.env.VITE_USER_TABLE)
            .select('*')
            .eq('id', id)
            .or(`isPublic.eq.true,user_id.eq.${user.id}`)
            .single()
          if (error) {
            setNotification({ message: error.message, type: 'error' })
          } else {
            return data
          }
        } catch (error) {
          setNotification({ message: error.message, type: 'error' })
        }
      } else {
        setNotification({ message: 'User not found on server', type: 'error' })
      }
    } else {
      try {
        const { data, error } = await supabase
          .from(import.meta.env.VITE_USER_TABLE)
          .select('*')
          .eq('id', id)
          .eq('isPublic', true)
          .single()
        if (error) {
          setNotification({ message: error.message, type: 'error' })
        } else {
          return data
        }
      } catch (error) {
        setNotification({ message: 'error.message', type: 'error' })
      }
    }
  }

  const createSingle = async (single) => {
    const { name, description, isPublic } = single
    const user = await getUserFromServer()
    if (user) {
      try {
        const { data, error } = await supabase
          .from(import.meta.env.VITE_USER_TABLE)
          .insert([
            {
              user_id: user.id,
              name,
              description,
              isPublic
            }
          ])
          .select()
        if (error) {
          setNotification({ message: error.message, type: 'error' })
        } else if (data) {
          const newId = data[0]?.id
          const newURL = paths.single.replace(':singleId', newId)
          const newName = data[0]?.name
          setNotification({ message: `${newName} created succesfully` })
          navigate(newURL)
        }
      } catch (error) {
        console.log(error)
      }
    } else {
      setNotification({ message: 'User not found on server', type: 'error' })
    }
  }

  const editSingle = async (single, singleId) => {
    const { name, description, isPublic } = single
    const user = await getUserFromServer()
    if (user) {
      try {
        const { data, error } = await supabase
          .from(import.meta.env.VITE_USER_TABLE)
          .update(
            {
              name,
              description,
              isPublic
            }
          )
          .eq('id', singleId)
          .eq('user_id', user.id)
          .select()
        if (error) {
          setNotification({ message: error.message, type: 'error' })
          return
        }
        setNotification({ message: `${single.name} updated succesfully` })
        navigate(paths.created.replace(':page', 1))
      } catch (error) {
        if (error) {
          setNotification({ message: error.message, type: 'error' })
        }
      }
    } else {
      setNotification({ message: 'User not found on server', type: 'error' })
    }
  }

  const deleteSingle = async (singleId) => {
    const user = await getUserFromServer()
    if (user) {
      const singleToDelete = await getSingle(singleId)
      try {
        const { error } = await supabase
          .from(import.meta.env.VITE_USER_TABLE)
          .delete()
          .eq('id', singleId)
        if (error) {
          setNotification({ message: error.message, type: 'error' })
          return
        }
        setNotification({ message: `${singleToDelete.name} deleted succesfully` })
        navigate(paths.created.replace(':page', 1))
      } catch (error) {
        if (error) {
          setNotification({ message: error.message, type: 'error' })
        }
      }
    } else {
      setNotification({ message: 'User not found on server', type: 'error' })
    }
  }

  const deleteAll = async () => {
    const user = await getUserFromServer()
    if (user) {
      try {
        const { data, error } = await supabase
          .from(import.meta.env.VITE_USER_TABLE)
          .delete()
          .eq('user_id', user.id)
        if (error) {
          setNotification({ message: error.message, type: 'error' })
        }
      } catch (error) {
        if (error) {
          setNotification({ message: error.message, type: 'error' })
        }
      }
    } else {
      setNotification({ message: 'User not found on server', type: 'error' })
    }
  }

  const isTheAuthor = (singleUserID) => {
    return singleUserID === userIdFromLocal
  }

  return {
    isTheAuthor,
    getList,
    getCreated,
    getSingle,
    createSingle,
    editSingle,
    deleteSingle,
    deleteAll
  }
}
