import React, { useState } from 'react'
import Tooltip from 'components/Tooltip'

const PasswordTips = () => {
  const [isTooltipOpen, toogleTooltip] = useState(false)
  return (
    <div className='d-flex justify-content-end mt-n2 position-relative'>
      <div className='link cursor-pointer' role='presentation' onClick={() => toogleTooltip(!isTooltipOpen)}>Dica de senha</div>
      <Tooltip
        isOpen={isTooltipOpen}
        onClose={() => toogleTooltip(false)}
      >
        <Tooltip.Header>
          <span>Critérios Obrigatórios</span>
        </Tooltip.Header>
        <Tooltip.Content>
          <p>- Não usar palavras comuns</p>
          <p>
            - Não usar dados pessoais seus ou de pessoas
            próximas (nome, endereço, data aniversario)
          </p>
          <p>- No minimo 8 digitos</p>
          <p>
            - Tentar deixar a senha mais dificil adicionando numeros,
            letras maiusculas e pontuação
          </p>
        </Tooltip.Content>
      </Tooltip>
    </div>
  )
}

export default PasswordTips
