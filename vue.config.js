module.exports = {
    devServer: {
        open: true,
        proxy: {
            '/api': {
                target: 'http://localhost:1000',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}