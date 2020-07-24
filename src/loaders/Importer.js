/* eslint-disable no-unused-expressions */
// @flow
import type { TLoader, TImporterLoader, TImporterImageReturn } from 'types'

function Importer(): TLoader<TImporterLoader> {
  function img(file: File): Promise<TImporterImageReturn> {
    return new Promise<TImporterImageReturn>((resolve) => {
      if (!file) {
        resolve({ value: false, name: '-' })
        return
      }

      const { name } = file
      const reader = new FileReader()

      reader.onload = () => {
        const { result: buffer } = reader
        if (!buffer) {
          resolve({ value: false, name: '-' })
          return
        }

        resolve({ value: buffer.toString(), name })
      }

      reader.onprogress = (ev) => {
        console.log(ev)
      }

      if (!name.endsWith('.jpg') && !name.endsWith('.png')) {
        resolve({ value: false, name: '-' })
        return
      }

      reader.readAsDataURL(file)
    })
  }


  return {
    load: async () => {
      return {
        img
      }
    }
  }
}

export default Importer
