const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ContextPath = "lavender/";

module.exports = {
  output: {
    path: path.join(__dirname, "/public"), // the bundle output path
    filename: `${ContextPath}bundle.js`, // the name of the bundle
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Lavender App",
      template: "src/template.html",
    }),
  ],
  devServer: {
    port: 3030, // you can change the port
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // .js and .jsx files
        exclude: /node_modules/, // excluding the node_modules folder
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(sa|sc|c)ss$/, // styles files
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/, // to import images and fonts
        loader: "url-loader",
        options: { limit: false },
      },
    ],
  },
};
