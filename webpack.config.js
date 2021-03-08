const path = require('path');
var glob = require('glob');

const entries = {};
const srcDir = "./src/js";
glob.sync("**/*.js", {
  ignore: '**/_*.js',
  cwd: srcDir
}).map(function (key) {
    entries[key] = path.resolve(srcDir, key);
});

module.exports = {
  mode: 'development',
  entry: entries,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name]',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                ["@babel/preset-env",{
                  "targets": [">0.25% in JP", "not ie <= 10", "not op_mini all"]
                }]
              ]
            }
          }
        ]
      }
    ]
  }
}