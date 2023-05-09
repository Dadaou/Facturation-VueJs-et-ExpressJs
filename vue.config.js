module.exports = {
    devServer: {
      proxy: {
        '/api': {
          port: 3000,
          target: 'http://localhost:3000',
          changeOrigin: true
        }
      }
    }
  }