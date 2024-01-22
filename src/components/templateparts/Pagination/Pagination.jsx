import usePagination from '../../../hooks/usePagination'
import { NavLink } from 'react-router-dom'

export default function Pagination ({ unfilteredList }) {
  const { numberOfPages } = usePagination(unfilteredList)
  const pages = numberOfPages()
  const pagesArr = new Array(pages).fill(0)

  return (
    <div>
      {pagesArr.map((page, index) => {
        const pageNumber = index + 1
        return (
          <NavLink to={`./../${pageNumber}`} key={pageNumber}>{pageNumber}</NavLink>
        )
      })}
    </div>
  )
}
