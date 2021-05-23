module.exports = {
  publicPath: './',
    devServer: {
      proxy: {
        '/api/*': {
          target: 'http://127.0.0.1:8086',
          ws: true,
          changeOrigin: true,
        
        }
      }
    }

  }