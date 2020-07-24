import moment from 'moment'

export const required = ((value) => {
  return value || value === 0 ? undefined : 'Este campo é obrigatório'
})

export const dateRequired = ((value) => {
  if (typeof value === 'string' && value.length >= 10) {
    const momentValue = moment(value, 'DD/MM/YYYY')
    if (moment.isMoment(momentValue)) {
      const day = momentValue.day()
      const month = momentValue.month()
      const year = momentValue.year()
      if (day <= 31 && month < 12 && year >= 1900 && year < 3000) {
        return undefined
      }
    }
  }

  return 'Informe uma data correta'
})

export const cpfValidator = (value = '') => {
  const cpf = value.replace(/[^\d]+/g, '')

  if (cpf === '') {
    return undefined
  }
  if (cpf.length !== 11
    || cpf === '00000000000'
    || cpf === '11111111111'
    || cpf === '22222222222'
    || cpf === '33333333333'
    || cpf === '44444444444'
    || cpf === '55555555555'
    || cpf === '66666666666'
    || cpf === '77777777777'
    || cpf === '88888888888'
    || cpf === '99999999999') {
    return 'Informe um CPF correto!'
  }

  let add = 0
  for (let i = 0; i < 9; i++) {
    add += parseInt(cpf.charAt(i), 10) * (10 - i)
  }

  let rev = 11 - (add % 11)
  if (rev === 10 || rev === 11) {
    rev = 0
  }
  if (rev !== parseInt(cpf.charAt(9), 10)) {
    return 'Informe um CPF correto!'
  }

  add = 0
  for (let i = 0; i < 10; i++) {
    add += parseInt(cpf.charAt(i), 10) * (11 - i)
  }
  rev = 11 - (add % 11)
  if (rev === 10 || rev === 11) {
    rev = 0
  }
  if (rev !== parseInt(cpf.charAt(10), 10)) {
    return 'Informe um CPF correto!'
  }

  return undefined
}

export const cnpjValidator = (value = '') => {
  const cnpj = value.replace(/[^\d]+/g, '')

  if (cnpj === '') {
    return undefined
  }

  if (cnpj.length !== 14) {
    return 'Informe um CNPJ correto!'
  }

  if (/^(\d)\1+$/.test(cnpj)) {
    return 'Informe um CNPJ correto!'
  }

  const t = cnpj.length - 2
  const d = cnpj.substring(t)
  const d1 = parseInt(d.charAt(0), 10)
  const d2 = parseInt(d.charAt(1), 10)
  const calc = x => {
    const n = cnpj.substring(0, x)
    let y = x - 7
    let s = 0
    let r = 0

    for (let i = x; i >= 1; i--) {
      s += n.charAt(x - i) * y--
      if (y < 2) {
        y = 9
      }
    }

    r = 11 - (s % 11)
    return r > 9 ? 0 : r
  }
  return calc(t) === d1 && calc(t + 1) === d2 ? undefined : 'Informe um CNPJ correto!'
}

export const weakPassword = (score) => () => {
  if (!score || score <= 30) {
    return 'A senha é muito fraca'
  }
  return undefined
}

export const maxLength = (max, message = 'Valor máximo ultrapassado!') => (value) => {
  if (value && value > max) {
    return message
  }
  return undefined
}

export const passwordsMatch = ((value, allValues) => {
  return value !== allValues.get('password') ? 'As duas senhas não conferem' : undefined
})

export const email = ((value) => {
  return value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'E-mail inválido' : undefined
})


export const username = ((value) => {
  return value && !/^[\w]+$/i.test(value)
    ? 'Usuário inválido, não pode possuir caracteres especiais' : undefined
})


export const cpfOrEmailValidator = (value) => {
  if (value) {
    // eslint-disable-next-line no-restricted-globals
    if (!isNaN(value[0])) {
      return cpfValidator(value)
    }
  }
  return email(value)
}
