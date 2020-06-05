/* eslint-disable no-use-before-define */
// @flow

import type { TColumnType } from 'constants/grid'

export type TExporterLoader = {
  excel(
    filename: string,
    title: string,
    columns: Array<TExcelColumn>,
    values: Array<Map<string, string>>
  ): Promise<any>,
}

export type TDomain = {
  label: string,
  value: string,
}

export type TExcelColumn = {
  key: string,
  name: string,
  type: TColumnType,
  width?: number,
  editable: boolean,
  resizable: boolean,
  domain?: Array<TDomain>,
}

export type TExcelValidation = {
  title: string,
  hint: string,
  type?: 'list' | 'whole' | 'decimal' | 'date' | 'textLength' | 'custom',
  showErrorMessage?: boolean,
  list?: string[],
  allowBlank?: boolean,
  custom?: string,
  numFmt?: string,
  length?: number,
}
