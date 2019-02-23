module.exports = {
  presets: [
    [
      "@babel/env", {
        "modules": false,
      }
    ],
    '@babel/preset-flow',
    '@babel/preset-react',
    'minify',
  ],
  plugins: [
    ["@babel/plugin-proposal-class-properties"],
  ],
}
