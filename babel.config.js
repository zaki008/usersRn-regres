module.exports = {
  presets: ['module:@react-native/babel-preset'],
  env: {
    production: {
      plugins: [
        'react-native-paper/babel',
        ['@babel/plugin-transform-private-methods', {loose: true}],
      ],
    },
  },
};
