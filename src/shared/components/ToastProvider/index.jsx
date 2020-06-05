import React, { createContext, Fragment } from 'react'
import PropTypes from 'prop-types'
import { ToastContainer, toast } from 'react-toastify'

export const ToastContext = createContext()

const ToastProvider = ({ children }) => {
  const showSuccessToast = (toastObject) => {
    toast(toastObject.message, {
      type: toast.TYPE.SUCCESS,
      closeButton: false,
      hideProgressBar: true,
      autoClose: 3000,
      draggable: false
    })
  }

  const showErrorToast = (toastObject) => {
    toast(toastObject.message, {
      type: toast.TYPE.ERROR,
      closeButton: false,
      hideProgressBar: true,
      autoClose: 3000,
      draggable: false
    })
  }

  return (
    <Fragment>
      <ToastContainer position={toast.POSITION.TOP_CENTER} />
      <ToastContext.Provider
        value={{ showSuccessToast, showErrorToast }}
      >
        { children }
      </ToastContext.Provider>
    </Fragment>
  )
}

ToastProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export default React.memo(ToastProvider)
