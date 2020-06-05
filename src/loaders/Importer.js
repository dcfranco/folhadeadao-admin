/* eslint-disable no-unused-expressions */
// @flow
import Excel, { Workbook as TWorkbook } from 'exceljs'
import type { TLoader, TImporterLoader, TExcelColumn, TImporterExcelReturn } from 'types'

function Importer(): TLoader<TImporterLoader> {
  function load(file: File): Promise<TWorkbook> {
    return new Promise<TWorkbook>((resolve, reject) => {
      if (!file) {
        return reject(new Error('Não foi possível localizar um arquivo.'))
      }

      const { name } = file
      const wb = new Excel.Workbook()
      const reader = new FileReader()

      reader.onload = () => {
        const { result: buffer } = reader

        if (name.endsWith('.xlsx')) {
          return wb.xlsx.load(buffer).then((workbook: TWorkbook) => {
            resolve(workbook)
          })
        }
        if (name.endsWith('.csv')) {
          return wb.csv.read(buffer).then((workbook: TWorkbook) => {
            resolve(workbook)
          })
        }

        return null
      }

      reader.onprogress = (ev) => {
        console.log(ev)
      }

      if (name.endsWith('.xlsx')) {
        return reader.readAsArrayBuffer(file)
      }
      if (name.endsWith('.csv')) {
        return reader.readAsText(file)
      }

      return null
    })
  }

  function serialize<T>(
    workbook: TWorkbook, sheetname: string, columns: Array<TExcelColumn>
  ): Array<T> {
    const [, cols, ...rows] = workbook.getWorksheet(sheetname).getSheetValues()
    return rows.map((row) => {
      return row.reduce((obj, value, jnx) => {
        const col = columns[jnx - 1]
        if (col && cols[jnx] === col.name) {
          return {
            ...obj,
            [col.key]: value
          }
        }
        return obj
      }, {})
    })
  }

  function excel<T>(
    file: File,
    sheetname: string,
    columns: Array<TExcelColumn>
  ): Promise<TImporterExcelReturn<T>> {
    return new Promise<TImporterExcelReturn<T>>((resolve, reject) => {
      load(file).then((wb) => {
        const values = serialize<T>(wb, sheetname, columns)
        resolve({
          values,
          workbook: wb
        })
      }).catch(reject)
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

export default Importer
