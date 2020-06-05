import React, { useEffect } from 'react'

const AppLoader = () => {
  useEffect(() => {
    document.body.style.backgroundColor = '#8a8a8a'
  }, [])

  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'fixed',
        top: 0,
        left: 0
      }}
    >
      <div
        style={{ width: '100%', height: '100%' }}
        className='lds-ripple'
      >
        <div />
        <div />
        <div />
      </div>
    </div>
  )
}

export default React.memo(AppLoader)
