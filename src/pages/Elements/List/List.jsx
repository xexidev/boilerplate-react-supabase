import { useEffect, useContext, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { UserContext } from '../../../context/UserContext'
import Pagination from '../../../components/templateparts/Pagination/Pagination'
import useServer from '../../../hooks/useServer'
import paths from '../../../paths'
import usePagination from '../../../hooks/usePagination'

export default function List () {
  const [list, setList] = useState()
  const [filteredList, setFilteredList] = useState(null)
  const { getPaginatedList } = usePagination()
  const { isLoggedFromLocal, userIdFromLocal } = useContext(UserContext)
  const { isTheAuthor, getList } = useServer()
  const { page: currentPageNumber } = useParams()

  useEffect(() => {
    const loadRecipes = async () => {
      const loadedRecipes = await getList()
      setList(loadedRecipes)
    }
    loadRecipes()
  }, [userIdFromLocal, isLoggedFromLocal, currentPageNumber])

  useEffect(() => {
    if (list) {
      const newList = getPaginatedList(list, currentPageNumber)
      setFilteredList(newList)
    }
  }, [list])

  return (
    <>
    <h2>List</h2>
    { filteredList
      ? <>
          <ul>
              {filteredList.map(single => (
                <li key={single.id}>
                  <h3><Link to={paths.single.replace(':singleId', single.id)}>{single.name}</Link></h3>
                  <p>{single.description}</p>
                  {isTheAuthor(single.user_id) && <Link to={paths.edit} state={single.id} >Edit</Link>}
                </li>
              ))}
          </ul>
          <Pagination unfilteredList={list} />
        </>
      : <span>Loading...</span>
    }
    </>
  )
}
