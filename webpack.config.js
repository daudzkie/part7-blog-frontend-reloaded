const path = require('path')
const webpack = require('webpack')


// Search webpack config for Semantic UI
const config = () => {

    return {
        // the file that will serve as the entry point for bundling the application
        entry: ['@babel/polyfill', './src/index.js'],

        // the location where the bundled code will be stored
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: 'main.js'
        },
        devServer: {
            contentBase: path.resolve(__dirname, 'build'),
            compress: true,
            port: 3000,
        },
        devtool: 'source-map',
        module: {
            // Loaders that tell webpack how to deal with different files
            rules: [
                {
                    test: /\.js$/, // This loader is for files that have names ending with .js
                    loader: 'babel-loader', // The processing will be done with the lib babel-loader
                    query: { // Parameters for the loader
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                    },
                },
                {
                    // CSS and Style loader
                    test: /\.css$/,
                    loaders: ['style-loader', 'css-loader'],
                },
                {
                    // Img loader
                    test: /\.(png|svg|jpg|gif)$/,
                    loader: 'file-loader',
                    options: {
                        outputPath: 'img/',
                    }
                },
                {
                    // Fonts loader
                    test: /\.(woff|woff2|ttf|eot|otf)$/,
                    loader: 'file-loader',
                    options: {
                        outputPath: 'fonts/',
                    }
                },
            ],
        },
        plugins: [
            // Define a webpack env variable to be used in services/
            new webpack.DefinePlugin({
                BACKEND_URL: JSON.stringify('http://localhost:3003')
            })
        ]
    }
}

module.exports = config