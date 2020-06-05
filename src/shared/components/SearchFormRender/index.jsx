import { useLayoutEffect, useState, memo } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

const SearchFormRender = memo(({ children }) => {
  const [portal, setPortal] = useState()

  useLayoutEffect(() => {
    setPortal(document.getElementById('search-form-render'))
    return () => {
      setPortal(null)
    }
  }, [])

  if (portal) {
    return ReactDOM.createPortal(children, portal)
  }

  return null
})

SearchFormRender.propTypes = {
  children: PropTypes.node.isRequired
}

export default SearchFormRender
