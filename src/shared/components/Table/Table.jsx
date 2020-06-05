import React, { memo, useRef, useState, useEffect, useLayoutEffect, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useSelector } from 'react-redux'
import { useWindowSize } from 'hooks'

const getLastElementInHeader = (table) => {
  const ths = table.querySelectorAll('th:not(.fixed-action)')
  return ths.length > 0 && ths[ths.length - 1]
}

const createTableScrollObservable = (element, container, cb) => {
  const obs = new IntersectionObserver((entries, observer) => {
    if (entries[0] && entries[0].isIntersecting) {
      cb()
      observer.unobserve(element)
    }
  }, { root: container, rootMargin: '16px 5px 16px 70px', threshold: 1 })
  obs.observe(element)
}

export const Table = memo(forwardRef((props, ref) => {
  const { children, className, showToast, backgroundColor, disableAction,
    containerRef, tableRef, onUpdateActionColumn } = props
  const size = useWindowSize()
  const containerRefIn = useRef()
  const tableRefIn = useRef()
  const [showActionColumn, setShowActionColumn] = useState(false)
  /*
    const dispatch = useDispatch()
    const hideToast = () => dispatch(userDisableTableToast())
  */
  const hideToast = () => {}
  const isTableToastDisabled = useSelector(state => state.user.getIn(['data', 'isTableToastDisabled']))

  useImperativeHandle(ref, () => ({
    scrollToEnd(behavior = 'smooth') {
      return new Promise((resolve) => {
        const { current: container } = containerRefIn
        const { current: table } = tableRefIn
        setTimeout(() => container.scrollTo({
          left: table.offsetWidth,
          behavior
        }))

        const lastTh = getLastElementInHeader(table)
        createTableScrollObservable(lastTh, container, resolve)
      })
    }
  }))

  useEffect(() => {
    const { current: container } = containerRefIn
    const { current: table } = tableRefIn

    if (!showActionColumn && table.offsetWidth > container.offsetWidth && !disableAction) {
      onUpdateActionColumn(true)
      setShowActionColumn(true)
    } else if ((showActionColumn && table.offsetWidth <= container.offsetWidth) || disableAction) {
      onUpdateActionColumn(false)
      setShowActionColumn(false)
    }
  }, [size, disableAction])

  useLayoutEffect(() => {
    if (containerRef && containerRef.current === null) {
      const { current: container } = containerRefIn
      containerRef.current = container
    }
    if (tableRef && tableRef.current === null) {
      const { current: table } = tableRefIn
      tableRef.current = table
    }
  }, [])

  return (
    <div className={classNames('w-100 px-3 mb-4 position-relative', backgroundColor)}>
      <div className='w-100 pb-2 overflow-auto' ref={containerRefIn}>
        <table
          ref={tableRefIn}
          className={classNames('table-onidata', {
            'show-action-column': showActionColumn
          }, className)}
          data-testid='table-onidata-id'
        >
          { children }
        </table>
        { showToast && !isTableToastDisabled && (
          <div className='d-lg-none'>
            <div
              role='presentation'
              onClick={hideToast}
              className='table-toast'
              data-testid='table-toast-id'
            >
              <span> Arraste para o lado para visualizar o conteúdo </span>
            </div>
            <div
              role='presentation'
              className='toast-overlay active'
              onClick={hideToast}
            />
          </div>
        ) }
      </div>
    </div>
  )
}))

Table.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  backgroundColor: PropTypes.string,
  showToast: PropTypes.bool,
  disableAction: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number
  ]),
  onUpdateActionColumn: PropTypes.func,
  containerRef: PropTypes.object,
  tableRef: PropTypes.object
}

Table.defaultProps = {
  className: '',
  showToast: false,
  backgroundColor: 'bg-container',
  disableAction: false,
  containerRef: null,
  tableRef: null,
  onUpdateActionColumn: () => {}
}
