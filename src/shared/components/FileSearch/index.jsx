import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

export const FileSearch = (props) => {
  const { children, className, btnClassName, accept, onChange } = props
  let fileInput = null

  return (
    <div className={classNames('file-search', className)}>
      <button
        className={classNames('btn', btnClassName)}
        type='button'
        onClick={() => fileInput && fileInput.click()}
      >
        { children }
      </button>
      <input
        ref={file => fileInput = file}
        type='file'
        name='file-button'
        accept={accept}
        onChange={onChange}
      />
    </div>
  )
}

FileSearch.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  btnClassName: PropTypes.string,
  onChange: PropTypes.func,
  accept: PropTypes.string
}

FileSearch.defaultProps = {
  className: '',
  btnClassName: 'btn-primary',
  onChange: null,
  accept: ''
}

export default FileSearch
