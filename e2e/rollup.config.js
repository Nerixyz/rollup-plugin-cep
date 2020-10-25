import cep from 'rollup-plugin-cep';

export default {
  input: 'index.js',
  output: {
    dir: 'dist',
  },
  plugins: [
    cep()
  ]
}
