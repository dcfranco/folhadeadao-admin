// @flow
export const EProfileTypes = {
  DEFAULT: 'default',
  MODULE: 'module'
}
export type TProfileTypes = $Values<typeof EProfileTypes>

export const EProfileKeys = {
  SELLER: 'seller',
  ADMIN: 'admin',
  DEFAULT: 'default'
}
export type TProfileKeys = $Values<typeof EProfileKeys>
