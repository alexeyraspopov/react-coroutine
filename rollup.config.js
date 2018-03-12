import babel from 'rollup-plugin-babel';

let config = {
  babelrc: false,
  presets: [
    ['env', { modules: false, loose: true }],
  ],
  plugins: ['external-helpers']
};

export default [
  {
    input: 'modules/Coroutine.js',
    output: {
      file: 'build/react-coroutine.js',
      format: 'cjs',
    },
    plugins: [babel(config)],
    external: ['react'],
  },
  {
    input: 'modules/Coroutine.js',
    output: {
      file: 'build/react-coroutine.module.js',
      format: 'es',
    },
    plugins: [babel(config)],
    external: ['react'],
  },
];
