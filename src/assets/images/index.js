/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
const req = require.context('.', true, /\.png$/)
const { snakeCase } = require('lodash')

req.keys().forEach((key) => {
  const componentName = snakeCase(key.replace(/^.+\/([^/]+)\.png/, '$1'))
  module.exports[componentName.toUpperCase()] = require(`${key}`)
})
