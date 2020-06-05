import { useState, useRef } from 'react'
import { debounce } from 'lodash'
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect'

const WINDOW_SIZES = {
  XS: (width) => width < 768,
  SM: (width) => width < 992,
  MD: (width) => width < 1200,
  LG: (width) => width >= 1200
}

function getWindowSize() {
  return new Promise((resolve) => {
    const width = window.innerWidth
    const sizes = Object.keys(WINDOW_SIZES)
    for (let i = 0; i < sizes.length; i++) {
      const size = sizes[i]
      if (WINDOW_SIZES[size](width)) {
        resolve(size)
      }
    }
  })
}

function useWindowSize() {
  const [windowSize, updateWindowSize] = useState()
  const latestWindowSize = useRef()

  const onWindowResize = debounce(async () => {
    const size = await getWindowSize()
    updateWindowSize(size)
  }, 100, { leading: false, trailing: true })

  useIsomorphicLayoutEffect(() => {
    if (latestWindowSize.current !== windowSize) {
      latestWindowSize.current = windowSize
    }
  }, [windowSize])

  useIsomorphicLayoutEffect(() => {
    getWindowSize().then((size) => updateWindowSize(size))
    window.addEventListener('resize', onWindowResize)
    return () => window.removeEventListener('resize', onWindowResize)
  }, [])

  return windowSize
}

export default useWindowSize
