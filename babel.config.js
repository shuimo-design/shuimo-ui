module.exports = {
  presets: [
    '@babel/preset-typescript',
    ['@babel/preset-env', { targets: { node: 'current' } }]
  ],
  plugins: [
    ['@vue/babel-plugin-jsx', { mergeProps: false }],
    '@babel/plugin-transform-modules-commonjs'
  ]
};
