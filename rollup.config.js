import babel from 'rollup-plugin-babel';

const config = {
  babelrc: false,
  presets: [
    ['es2015', { modules: false, loose: true }],
  ],
  plugins: ['external-helpers']
};

export default {
  plugins: [babel(config)]
};
