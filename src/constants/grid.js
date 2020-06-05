// @flow

export const ColumnType = {
  CHECKBOX: 'checkbox',
  CURRENCY: 'numeric',
  DROPDOWN: 'dropdown',
  DATE: 'date',
  CPF: 'cpf'
}
export type TColumnType = $Values<typeof ColumnType>
