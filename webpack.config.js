const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = [
    {
        mode: 'development',
        entry: './src/app/Program.ts',
        target: 'electron-main',
        module: {
            rules: [{
                test: /\.ts$/,
                include: /src/,
                use: [{ loader: 'ts-loader' }]
            }]
        },
        resolve: {
            extensions: ['.ts', '.js']
        },
        output: {
            path: __dirname + '/dist',
            filename: 'acid-cam.js'
        }
    },

    {
        mode: 'development',
        entry: './src/ui/App.tsx',
        target: 'electron-renderer',
        devtool: 'source-map',
        module: {
            rules: [{
                test: /\.ts(x?)$/,
                include: /src/,
                use: [{ loader: 'ts-loader' }]
            }]
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js']
        },
        output: {
            path: __dirname + '/dist',
            filename: 'App.js'
        },
        plugins: [
            new HtmlWebpackPlugin({ template: './src/app/index.html' })
        ]
    },

    {
        mode: 'development',
        entry: './src/common/preload.ts',
        target: 'electron-renderer',
        devtool: 'source-map',
        module: {
            rules: [{
                test: /\.ts(x?)$/,
                include: /src/,
                use: [{ loader: 'ts-loader' }]
            }]
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js']
        },
        output: {
            path: __dirname + '/dist',
            filename: 'preload.js'
        }
    }
];
