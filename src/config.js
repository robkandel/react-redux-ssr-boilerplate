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
    title: 'React Redux SSR Boilerplate',
    description: 'React Redux Server Side Rendering Boilerplate',
    head: {
      titleTemplate: 'React Redux SSR Boilerplate - %s',
      meta: [
        { name: 'description', content: 'React Redux Server Side Rendering Boilerplate' },
        { charset: 'utf-8' },
        { property: 'og:site_name', content: 'React Redux SSR Boilerplate' },
        { property: 'og:image', content: 'https://react-redux.herokuapp.com/logo.jpg' },
        { property: 'og:locale', content: 'en_US' },
        { property: 'og:title', content: 'React Redux SSR Boilerplate' },
        { property: 'og:description', content: 'React Redux Server Side Rendering Boilerplate' }
      ]
    }
  },

}, environment);
