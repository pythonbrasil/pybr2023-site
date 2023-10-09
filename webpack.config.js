const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = () => {
  return {
    mode: "production",
    entry: {
      main: "./theme/resources/js/main.js",
      style: "./theme/resources/scss/main.scss",
    },
    output: {
      path: path.resolve(__dirname, "theme/static/"),
      filename: "js/[name].bundle.min.js",
    },
    devServer: {
      contentBase: path.resolve(__dirname, "./theme/static"),
      hot: true,
    },
    plugins: [
      new FixStyleOnlyEntriesPlugin(),
      new MiniCssExtractPlugin({
        filename: "css/[name].min.css",
      }),
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        },
        {
          test: /\.(s(a|c)ss)$/,
          exclude: /node_modules/,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            "sass-loader",
            {
              loader: "sass-loader",
              options: {
                implementation: require("sass"),
              },
            },
          ],
        },
      ],
    },
    optimization: {
      minimizer: [new CssMinimizerPlugin()],
    },
    plugins: [new MiniCssExtractPlugin()],
  };
};
