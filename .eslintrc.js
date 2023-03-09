module.exports = {
  root: true,

  env: {
    node: true,
    browser: true,
  },

  extends: [
    'plugin:vue/recommended',
    '@vue/airbnb',
  ],

  rules: {
    'no-debugger': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'import/extensions': ['error', 'always', {
      js: 'never',
    }],
    'max-len': [2, {
      code: 120, ignoreStrings: true, ignoreTemplateLiterals: true, ignoreUrls: true,
    }],
    'vue/html-closing-bracket-newline': ['error', {
      singleline: 'never',
      multiline: 'never',
    }],
    'vue/max-attributes-per-line': ['error', {
      singleline: 1,
      multiline: {
        max: 1,
        allowFirstLine: false,
      },
    }],
    'vue/component-name-in-template-casing': ['error', 'kebab-case', {
      registeredComponentsOnly: true,
      ignores: [],
    }],
    'no-param-reassign': ['error', {
      props: true,
      ignorePropertyModificationsFor: [
        'state', // for vuex state
        'acc', // for reduce accumulators
        'e', // for e.return value
        'rootState', // for vuex rootState
      ],
    }],
  },

  parserOptions: {
    parser: 'babel-eslint',
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.module'],
      },
    },
  },
  globals: {
    debugger: true,
    liquid_tags: true,
    axios: true,
    screen: true,
    require: true,
    axios_api_new: true,
    axios_modyo_new: true,
    axios_api_SBS_web: true,
    axios_api_sbs_apiweb: true,
  },

};
