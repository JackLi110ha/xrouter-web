module.exports = {
  runtimeCompiler: true,
  productionSourceMap: false,
  publicPath: process.env.BASE_URL || '/',
  devServer:{
    proxy:{
      '/cgi-bin':{
        target:"http://47.91.141.191:8000/",
        changeOrigin:true,
        ws:true
      }
    }
  },
  configureWebpack: {
    // No need for splitting
    optimization: {
      splitChunks: {
        chunks: 'all'
      }
    }
  },
  
}