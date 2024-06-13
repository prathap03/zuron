module.exports = {
    root: 'src',
    build: {
        outDir: '../build',
        rollupOptions: {
            input: './src/index.html',
            output: {
                entryFileNames: `[name].js`,
                chunkFileNames: `[name].js`,
                assetFileNames: `[name].[ext]`
            }
        }
    }
};