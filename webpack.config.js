const webpack = require("webpack");
const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  externals: [nodeExternals()],
  devtool: "inline-source-map",
  entry: { index: "./src/index" },
  target: "node",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].bundle.js",
    libraryTarget: "commonjs2"
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: false,
      debug: false,
      noInfo: false
    })
  ],
  module: {
    rules: [{ test: /\.js$/, exclude: /node_modules/, use: "babel-loader" }]
  }
};
