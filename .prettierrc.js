module.exports = {
  arrowParens: 'avoid',
  bracketSameLine: false,
  singleQuote: true,
  trailingComma: 'all',
  importOrder: [
    '<THIRD_PARTY_MODULES>',
    '^@react-navigation/(.*)',
    'screens/',
    'components/',
    'services/',
    'navigation/',
    'core/',
    'consts/',
    'context/',
    'types/',
    '^[./]',
  ],
};
