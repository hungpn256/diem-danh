module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
  },
  plugins: [
    'react',
    'react-hooks',
    '@typescript-eslint',
    'eslint-plugin-no-inline-styles',
    'boundaries',
  ],
  extends: [
    'prettier',
    'plugin:react/recommended',
    'plugin:boundaries/recommended',
  ],
  settings: {
    'boundaries/elements': [
      {
        type: 'components',
        pattern: 'components/*',
        capture: ['family', 'elementName'],
      },
    ],
  },
  rules: {
    'no-console': 'error',
    '@typescript-eslint/no-unused-vars': ['error', { args: 'after-used' }],
    'boundaries/external': [
      2,
      {
        default: 'disallow',
        rules: [
          {
            from: [['components', { family: 'atoms' }]],
            allow: [
              'react',
              [
                'react-native',
                {
                  specifiers: [
                    'TouchableOpacity',
                    'Image',
                    'FlatList',
                    'Text',
                    'View',
                    'ScrollView',
                    'KeyboardAvoidingView',
                  ],
                },
              ],
              'types',
              'consts',
              'context',
            ],
          },
          {
            from: [['components', { family: 'molecules' }]],
            allow: [
              'react',
              'types',
              'consts',
              [
                'components',
                {
                  specifiers: [
                    'BaseScroll',
                    'BaseKeyboardAvoiding',
                    'BaseView',
                  ],
                },
              ],
            ],
          },
          {
            from: [['components', { family: 'organisms' }]],
            allow: [
              'react',
              [
                'react-native',
                {
                  specifiers: ['AppState'],
                },
              ],
              [
                'components',
                {
                  specifiers: ['BaseView'],
                },
              ],
              'react-native-code-push',
            ],
          },
        ],
      },
    ],
  },
};
