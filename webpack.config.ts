import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import {Configuration as WebpackConfiguration} from 'webpack'
import {Configuration as DevServerConfiguration} from 'webpack-dev-server'

interface Configuration extends WebpackConfiguration {
    devServer?: DevServerConfiguration
}

interface BuildEnv {
    mode: 'production' | 'development'
}

export default (env: BuildEnv): Configuration => ({
    mode: env.mode ?? 'development',
    devtool: 'inline-source-map',
    entry: './src/index.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    devServer: {
        port: 9000,
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './example/index.html',
        }),
    ],
    output: {
        filename: 'bundle.js',
        clean: true,
        path: path.resolve(__dirname, 'example'),
    },
})
