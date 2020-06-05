const req = require.context('.', true, /\.svg$/)
const { snakeCase } = require('lodash')

req.keys().forEach((key) => {
  const componentName = snakeCase(key.replace(/^.+\/([^/]+)\.svg/, '$1'))
  module.exports[componentName.toUpperCase()] = req(key).default
})
