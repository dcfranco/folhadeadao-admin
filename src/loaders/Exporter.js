/* eslint-disable no-unused-expressions */
// @flow
import Excel, { Column as TColumn, Worksheet as TWorksheet, Cell as TCell } from 'exceljs'
import type { TLoader, TExporterLoader, TExcelColumn, TExcelValidation } from 'types'
import { ColumnType } from 'constants/grid'

import { saveAs } from 'file-saver'

function Exporter(): TLoader<TExporterLoader> {
  function mapColumnsToExcelJs(columns: Array<TExcelColumn>): Array<TColumn> {
    return columns.map((column) => {
      return {
        header: column.name,
        key: column.key,
        width: column.name.length + 5
      }
    })
  }

  function applyValidation(
    ws: TWorksheet, model: TCell, validation: TExcelValidation
  ): Promise<boolean> {
    return new Promise((resolve) => {
      const lastRow = ws.lastRow.number

      // eslint-disable-next-line no-param-reassign
      ws.getCell(1, model.col).dataValidation = {
        promptTitle: validation.title,
        prompt: validation.hint,
        showInputMessage: true
      }

      ws.getColumn(model.col).eachCell({ includeEmpty: true }, (cell, rowNumber) => {
        if (rowNumber > 1) {
          if (validation.list) {
            const formulae = [`"${validation.list.join(',')}"`]
            // eslint-disable-next-line no-param-reassign
            ws.getCell(cell.address).dataValidation = {
              type: validation.type,
              allowBlank: validation.allowBlank,
              formulae,
              showErrorMessage: validation.showErrorMessage
            }
          } else if (typeof validation.length !== 'undefined') {
            // eslint-disable-next-line no-param-reassign
            ws.getCell(cell.address).dataValidation = {
              type: 'textLength',
              allowBlank: validation.allowBlank,
              showErrorMessage: validation.showErrorMessage,
              operator: 'between',
              formulae: [validation.length - 1, validation.length],
              error: validation.hint,
              errorTitle: validation.title
            }
          } else if (validation.type) {
            // eslint-disable-next-line no-param-reassign
            ws.getCell(cell.address).dataValidation = {
              type: validation.type,
              allowBlank: validation.allowBlank,
              showErrorMessage: validation.showErrorMessage
            }
          }

          if (validation.numFmt) {
          // eslint-disable-next-line no-param-reassign
            ws.getCell(cell.address).numFmt = validation.numFmt
          }
        }

        if (rowNumber >= lastRow) {
          resolve(true)
        }
      })
    })
  }

  function mapValidationsToExcelJs(
    ws: TWorksheet, columns: Array<TExcelColumn>
  ): Promise<any> {
    return Promise.all(columns.map<Promise<any>>((column, inx) => {
      const model = ws.getCell(1, inx + 1)
      if (column.type === ColumnType.DATE) {
        return applyValidation(ws, model, {
          type: 'date',
          title: 'Data',
          hint: 'Inserir data no formato DD/MM/AAAA.',
          showErrorMessage: true,
          numFmt: 'dd/mm/yyyy'
        })
      }

      if (column.type === ColumnType.CHECKBOX) {
        return applyValidation(ws, model, {
          type: 'list',
          title: 'Campo de checagem',
          hint: 'Checar a opção desejada',
          showErrorMessage: true,
          allowBlank: false,
          list: ['Sim', 'Não']
        })
      }

      if (column.type === ColumnType.CURRENCY) {
        return applyValidation(ws, model, {
          type: 'custom',
          title: 'Moeda',
          showErrorMessage: true,
          hint: 'Inserir valor no formato da moeda brasileira',
          numFmt: 'R$ #,##0.00;'
        })
      }

      if (column.type === ColumnType.DROPDOWN && column.domain) {
        return applyValidation(ws, model, {
          type: 'list',
          title: 'Selecione',
          showErrorMessage: true,
          allowBlank: false,
          hint: 'Selecionar a opção desejada',
          list: column.domain.map<string>((o) => o.label)
        })
      }

      if (column.type === ColumnType.CPF) {
        return applyValidation(ws, model, {
          type: 'textLength',
          title: 'CPF',
          showErrorMessage: true,
          allowBlank: false,
          length: 11,
          hint: 'Inserir o CPF sem caracteres especiais',
          numFmt: '0##"."###"."###"-"##'
        })
      }

      return Promise.resolve()
    }))
  }

  function excel(
    filename: string, title: string, columns: Array<TExcelColumn>, values: Array<Object>
  ): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      if (!values || !Array.isArray(values)) {
        reject(new Error('[TExporter]: Values is not a valid array'))
        return
      }

      try {
        const wb = new Excel.Workbook()
        wb.properties.date1904 = true
        const ws = wb.addWorksheet(title)
        ws.columns = mapColumnsToExcelJs(columns)
        ws.addRows(values)
        mapValidationsToExcelJs(ws, columns).then(() => {
          wb.xlsx.writeBuffer().then((data) => {
            const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
            saveAs(blob, filename)
            resolve()
          }).catch(reject)
        }).catch(reject)
      } catch (e) {
        reject(e)
      }
    })
  }

  return {
    load: async () => {
      return {
        excel
      }
    }
  }
}

export default Exporter
