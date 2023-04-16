module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
  },
  plugins: ['react', 'react-hooks', '@typescript-eslint'],
  extends: ['prettier', 'plugin:react/recommended'],
  rules: {
    'no-console': 'error',
    '@typescript-eslint/no-unused-vars': ['error', { args: 'after-used' }],
    '@typescript-eslint/explicit-function-return-type': ['error'],
  },
};
