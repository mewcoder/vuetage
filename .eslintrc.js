/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    'plugin:vue/essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript/recommended',
    '@vue/eslint-config-prettier'
  ],
  env: {
    node: true
  },
  rules: {
    'no-console': 'off',
    'prefer-const': 'warn',
    'no-var': 'warn',
    'no-unused-vars': 'warn'
  }
};
