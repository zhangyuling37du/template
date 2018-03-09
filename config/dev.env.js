var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
      //j 
      // BASE_API:'"http://192.168.7.45:8080"'
      //z 
    // BASE_API:'"http://192.168.7.43:8080"'
    // BASE_API:'"http://192.168.7.201:8080"'
  
  
  // BASE_API:'"http://192.168.104.105:8080"'
  // BASE_API:'"http://192.168.104.105:8080"'
})
