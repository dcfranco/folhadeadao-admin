// User Status
export const UserStatus = {
  ACTIVE: 'ativo',
  OFF: 'desligado',
  INVALID: 'invalidez',
  DEATH: 'obito',
  AWAY: 'afastado'
}

export const UserStatusColor = {
  [UserStatus.ACTIVE]: 'success',
  [UserStatus.OFF]: 'danger',
  [UserStatus.INVALID]: 'warning',
  [UserStatus.DEATH]: 'danger',
  [UserStatus.AWAY]: 'warning'
}

export const UserStatusDescription = {
  [UserStatus.ACTIVE]: 'Ativo',
  [UserStatus.OFF]: 'Desligado',
  [UserStatus.INVALID]: 'Invalidez',
  [UserStatus.DEATH]: 'Óbito',
  [UserStatus.AWAY]: 'Afastado'
}
