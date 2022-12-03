module.exports = {
  runtimeCompiler: true,
  productionSourceMap: false,
  publicPath: process.env.BASE_URL || '/',
 
  configureWebpack: {
    // No need for splitting
    optimization: {
      splitChunks: {
        chunks: 'all'
      }
    }
  },
  
}