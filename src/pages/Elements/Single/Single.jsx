import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import useServer from '../../../hooks/useServer'
import paths from '../../../paths'

export default function Single () {
  const [isLoading, setIsLoading] = useState(true)
  const { singleId } = useParams()
  const [single, setSingle] = useState()
  const { isTheAuthor, getSingle } = useServer()

  const getSelected = async (singleId) => {
    if (singleId) {
      const newSingle = await getSingle(singleId)
      setSingle(newSingle)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getSelected(singleId)
  }, [singleId])

  return (
    <>
      <h3>Single Element</h3>
      { isLoading
        ? <span>Loading</span>
        : single
          ? <article>
              <h4>{single?.name}</h4>
              <br />
              { !single?.isPublic && <i>Private</i>}
              <br />
              { isTheAuthor(single?.user_id) && <Link to={paths.edit} state={single?.id} >Edit</Link> }
            </article>
          : <span>Element is private or does not exist</span>
      }
    </>
  )
}
