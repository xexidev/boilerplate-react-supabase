export default function usePagination (unfilteredList) {
  const itemsPerPage = 2

  const getPaginatedList = (list = null, currentPageNumber) => {
    let newList = null
    if (list) {
      const end = (currentPageNumber * itemsPerPage)
      const start = end - itemsPerPage
      newList = list.slice(start, end)
    }
    return newList
  }

  const numberOfPages = () => {
    const totalItems = unfilteredList.length
    const totalPages = Math.ceil(totalItems / itemsPerPage)
    return totalPages
  }

  return {
    numberOfPages,
    getPaginatedList
  }
}
