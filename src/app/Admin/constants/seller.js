// Seller Status
export const SellerStatus = {
  ACTIVE: 'ativo',
  OFF: 'desligado',
  INVALID: 'invalidez',
  DEATH: 'obito',
  AWAY: 'afastado'
}

export const SellerStatusColor = {
  [SellerStatus.ACTIVE]: 'success',
  [SellerStatus.OFF]: 'danger',
  [SellerStatus.INVALID]: 'warning',
  [SellerStatus.DEATH]: 'danger',
  [SellerStatus.AWAY]: 'warning'
}

export const SellerStatusDescription = {
  [SellerStatus.ACTIVE]: 'Ativo',
  [SellerStatus.OFF]: 'Desligado',
  [SellerStatus.INVALID]: 'Invalidez',
  [SellerStatus.DEATH]: 'Óbito',
  [SellerStatus.AWAY]: 'Afastado'
}
