import path from "node:path";

import webpack from "webpack";

import {Configuration as WebpackConfiguration} from "webpack";
import {Configuration as DevServerConfiguration} from "webpack-dev-server";

import HtmlWebpackPlugin from "html-webpack-plugin";
import {TsconfigPathsPlugin} from "tsconfig-paths-webpack-plugin";

const devServer: DevServerConfiguration = {
   historyApiFallback: true,
   hot: true,
   http2: true,
};

const config: WebpackConfiguration = {
   devtool: false,
   mode: "development",

   entry: "./src/index.tsx",

   devServer,

   output: {
      filename: "[name].[contenthash].js",
      path: path.resolve(__dirname, "dist",),
      assetModuleFilename: "[name][ext]",
      clean: true,
   },

   plugins: [
      new HtmlWebpackPlugin({
         template: path.resolve(__dirname, "src", "index.html"),
      }),
   ],

   resolve: {
      extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],

      // alias: {
      //    "@layouts": path.resolve(__dirname, "src", "layouts") ,
      //    "@pages": path.resolve(__dirname, "src", "pages") ,
      // },

      plugins: [
         new TsconfigPathsPlugin({
            configFile: path.resolve(__dirname, "tsconfig.json"),
         }),
      ]
   },

   module: {
      rules: [
         {
            test: /\.tsx?$/,
            exclude: /node_modules/,
            loader: "ts-loader",
            options: {
               transpileOnly: true,
               configFile: "tsconfig.json",
            }
         },

         {
            test: /\.css$/i,
            exclude: /node_modules/,
            use: [
               "style-loader",
               "css-loader",
            ]
         },
      ]
   },

   optimization: {
      splitChunks: {
         chunks: "all",
         cacheGroups: {
            react: {
               test: /[/\\]node_modules[/\\]react/,
               filename: 'react.[contenthash].js'
            }
         }
      },
   },
};

export default config;
