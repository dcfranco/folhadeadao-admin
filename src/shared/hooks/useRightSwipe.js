import { useRef } from 'react'
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect'

function useRightSwipe(callback, elementRef) {
  const startPos = useRef()
  const movedPos = useRef()

  const onTouchMove = (event) => {
    const { clientX, clientY } = event.targetTouches[0]
    movedPos.current = {
      clientX,
      clientY
    }
  }

  const onTouchEnd = (event) => {
    window.removeEventListener('touchend', onTouchEnd)
    window.removeEventListener('touchmove', onTouchMove)
    if (!movedPos.current) {
      return
    }

    const { clientX, clientY } = movedPos.current
    const { clientX: startClientX, clientY: startClientY } = startPos.current
    const swipped = clientX > startClientX && (clientX - startClientX) > 100
    if (Math.abs(clientY - startClientY) < 10 && swipped) {
      event.preventDefault()
      event.stopPropagation()
      callback()
      startPos.current = 0
    }
  }

  const onTouchStart = (event) => {
    const { clientX, clientY } = event.targetTouches[0]
    startPos.current = {
      clientX,
      clientY
    }
    movedPos.current = null
    window.addEventListener('touchend', onTouchEnd)
    window.addEventListener('touchmove', onTouchMove)
  }

  useIsomorphicLayoutEffect(() => {
    elementRef.current.addEventListener('touchstart', onTouchStart)
    return () => {
      elementRef.current.removeEventListener('touchstart', onTouchStart)
    }
  }, [callback, elementRef])
}

export default useRightSwipe
