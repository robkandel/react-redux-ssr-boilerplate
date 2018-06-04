require('babel-polyfill');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];


module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT,
  app: {
    title: 'React Boilerplate',
    description: 'This React boilerplate runs with redux and supports server side rendering',
    head: {
      titleTemplate: 'React Redux SSR Boilerplate - %s',
      meta: [
        { name: 'description', content: 'React Redux Server Side Rendering Boilerplate' },
        { charset: 'utf-8' },
        { property: 'og:site_name', content: 'React Redux SSR Boilerplate' },
        { property: 'og:image', content: 'https://reactjs.org/logo-og.png' },
        { property: 'og:locale', content: 'en_US' },
        { property: 'og:title', content: 'React Redux SSR Boilerplate' },
        { property: 'og:description', content: 'React Redux Server Side Rendering Boilerplate' }
      ]
    }
  },

}, environment);
