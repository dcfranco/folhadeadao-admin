import React from 'react'
import Loadable from '@loadable/component'
import Spinner from 'components/Spinner'

const LazyLoading = (loader) => {
  return Loadable(loader, {
    fallback: <Spinner noOverlay={true} />
  })
}

export default LazyLoading
