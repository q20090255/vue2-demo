module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/prettier'],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    semi: ['warn', 'never'], // 语句末尾不加分号
    quotes: ['warn', 'single'], // 默认使用单引号
    'jsx-quotes': ['warn', 'prefer-single'], // JSX属性中使用一致的单引号
    'space-before-function-paren': [
      'warn',
      { anonymous: 'never', named: 'never', asyncArrow: 'always' }
    ], // 在具名函数/和匿名函数名(function)后面不要留空格
    'array-bracket-newline': ['error', 'consistent'], // 数组两个[ ]之间需要一致的换行符
    'array-element-newline': ['error', 'consistent'], // 数组元素之间保持一致的换行符
    'comma-dangle': [
      'error',
      {
        arrays: 'never',
        objects: 'never',
        imports: 'never',
        exports: 'never',
        functions: 'ignore'
      }
    ], // 数组/对象末位元素不加逗号
    'multiline-ternary': ['error', 'always-multiline'], // 如果三元表达式自身跨越多个行，则在三元表达式的操作数(: / ? / && )之间强制换行。
    'object-property-newline': ['error', { allowAllPropertiesOnSameLine: true }], // 允许对象属性不换行，默认是强制换行
    'no-else-return': 'error', // if 内有 return 不允许结束后再跟 else
    'no-unused-vars': [
      0,
      {
        // 允许声明未使用变量
        vars: 'local',
        // 参数不检查
        args: 'none'
      }
    ], // 禁止有声明了却未使用的变量。暂时注释掉也会报错，所以注掉
    'no-unused-components': 'off' // 禁止有注册了却未使用的组件，原因同上
  }
}
