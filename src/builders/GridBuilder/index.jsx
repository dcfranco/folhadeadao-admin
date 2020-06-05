/* eslint-disable no-param-reassign */
import React, { forwardRef, useCallback, useRef, useState, memo, useImperativeHandle, useMemo } from 'react'
import PropTypes from 'prop-types'
import ReactDataGrid, { Cell, Row } from 'react-data-grid'
import { useExporter, useImporter } from 'hooks'
import { Editors, Formatters } from 'react-data-grid-addons'
import { createObject } from 'helpers'
import { useSelector } from 'react-redux'

import DateEditor from './editors/DateEditor'
import CurrencyEditor from './editors/CurrencyEditor'
import CheckboxEditor from './editors/CheckboxEditor'
import CpfEditor from './editors/CpfEditor'

import DateFormatter from './formatters/DateFormatter'
import CurrencyFormatter from './formatters/CurrencyFormatter'
import CheckboxFormatter from './formatters/CheckboxFormatter'
import DefaultFormatter from './formatters/DefaultFormatter'

export const COLUMN_TYPE = {
  CHECKBOX: 'checkbox',
  CURRENCY: 'numeric',
  DROPDOWN: 'dropdown',
  DATE: 'date',
  CPF: 'cpf'
}

const { DropDownEditor } = Editors
const { DropDownFormatter } = Formatters

const CellRendererComponent = forwardRef((props, ref) => {
  const { rowData, column: { path, primaryKey, parentKey } } = props
  const fullpath = `${parentKey}.${rowData[primaryKey]}.${path}`
  const hasError = useSelector(state => state.errors.getFieldError(fullpath))

  return (
    <Cell {...props} ref={ref} tooltip={hasError} className={hasError ? 'border border-danger bg-alert-danger' : ''} />
  )
})

CellRendererComponent.propTypes = {
  rowData: PropTypes.object.isRequired,
  column: PropTypes.object.isRequired
}

const CellRenderer = React.memo(CellRendererComponent)

class RowRenderer extends React.Component {
  render() {
    // eslint-disable-next-line react/no-string-refs
    return <Row cellRenderer={CellRenderer} ref='row' {...this.props} />
  }
}

const GridBuilder = () => {
  const _columns = []
  let _initialRows = 0
  let _primaryKey = null
  let _parentKey = null

  const builder = {
    addColumn: (key, name, path, type, domain, width = 150, editable = true) => {
      _columns.push({
        key,
        name,
        path,
        type,
        domain,
        width,
        editable
      })
      return builder
    },
    initialRows: initialRows => {
      _initialRows = initialRows
      return builder
    },
    primaryKey: primaryKey => {
      _primaryKey = primaryKey
      return builder
    },
    parentKey: parentKey => {
      _parentKey = parentKey
      return builder
    },
    build: () => {
      const getColumns = (gridRef) => _columns.map(
        ({ key, name, editable, width, type, path, domain }) => {
          let editor
          let formatter = <DefaultFormatter />
          const domainValues = domain && domain.map((o) => o.label)
          if (type === COLUMN_TYPE.DROPDOWN) {
            editor = <DropDownEditor options={domainValues} />
            formatter = <DropDownFormatter options={domainValues} />
          } else if (type === COLUMN_TYPE.CURRENCY) {
            editor = <CurrencyEditor />
            formatter = <CurrencyFormatter />
          } else if (type === COLUMN_TYPE.DATE) {
            editor = <DateEditor />
            formatter = <DateFormatter />
          } else if (type === COLUMN_TYPE.CHECKBOX) {
            editor = <CheckboxEditor />
            formatter = <CheckboxFormatter />
          } else if (type === COLUMN_TYPE.CPF) {
            editor = <CpfEditor />
          }

          return {
            key,
            name,
            width,
            path,
            editable,
            domain,
            editor,
            primaryKey: _primaryKey,
            parentKey: _parentKey,
            resizable: true,
            type,
            formatter,
            events: {
              onClick(ev, args) {
                if (type === COLUMN_TYPE.CHECKBOX) {
                  const { current: grid } = gridRef
                  grid.openCellEditor(args.rowIdx, args.idx)
                }
              }
            }
          }
        }
      )

      const getInitialRows = (columns) => Array(_initialRows).fill().map(() => {
        return columns.reduce((obj, column) => {
          obj[column.key] = ''
          return obj
        }, {})
      })

      const GridBuilt = memo(forwardRef(({ onRowsChange }, ref) => {
        const exporter = useExporter()
        const importer = useImporter()
        const gridRef = useRef()
        const columns = useMemo(() => getColumns(gridRef), [])
        const initialRows = useMemo(() => getInitialRows(columns), [])
        const [data, updateData] = useState(initialRows)

        const onGridRowsUpdated = useCallback(({ fromRow, toRow, updated }) => {
          const rows = data.slice()
          for (let i = fromRow; i <= toRow; i++) {
            rows[i] = { ...rows[i], ...updated }
          }
          updateData(rows)
          if (onRowsChange) {
            onRowsChange()
          }
          return { rows }
        }, [data])

        const rowGetter = useCallback((inx) => data[inx], [data])

        useImperativeHandle(ref, () => ({
          exportTemplate(filename, sheetname) {
            if (!filename || !sheetname) return false
            return exporter.excel(
              filename,
              sheetname,
              columns,
              initialRows
            )
          },
          import(file, sheetname) {
            if (!file) return false
            return importer.excel(file, sheetname, columns).then(({ values }) => {
              updateData(values)
              if (onRowsChange) {
                onRowsChange()
              }
            })
          },
          getData() {
            return data.reduce((rowArr, row) => {
              const cols = columns.reduce((colObj, col) => {
                if (col.path && row[col.key]) {
                  if (col.type === COLUMN_TYPE.DROPDOWN) {
                    const { value } = col.domain.find((o) => o.label === row[col.key])
                    return createObject(colObj, col.path, value)
                  }

                  return createObject(colObj, col.path, row[col.key])
                }
                return colObj
              }, {})
              if (Object.keys(cols).length > 0) {
                rowArr.push(cols)
              }
              return rowArr
            }, [])
          },
          clean() {
            updateData(initialRows)
          }
        }), [data])

        return (
          <ReactDataGrid
            ref={gridRef}
            columns={columns}
            rowGetter={rowGetter}
            rowsCount={data.length}
            rowScrollTimeout={null}
            enableCellSelect={true}
            minHeight={600}
            rowRenderer={RowRenderer}
            onGridRowsUpdated={onGridRowsUpdated}
          />
        )
      }))

      GridBuilt.propTypes = {
        onRowsChange: PropTypes.func
      }
      GridBuilt.defaultProps = {
        onRowsChange: () => {}
      }

      GridBuilt.displayName = 'GridBuilt'
      return GridBuilt
    }
  }

  return builder
}

export default GridBuilder
