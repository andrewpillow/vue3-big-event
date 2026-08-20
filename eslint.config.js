import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'
import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import pluginOxlint from 'eslint-plugin-oxlint'
import skipFormatting from 'eslint-config-prettier/flat'

export default defineConfig([
  {
    name: 'app/files-to-lint',
    files: ['**/*.{vue,js,mjs,jsx}']
  },

  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

  // elmessage能调用 但是报错
  // elment-plus的自动导入 是在编译和运行的时候引入的 eslint是静态的检查工具 察觉不到这些动态注入的变量
  // 这里手动将 ElMessage 声明为全局变量 就不需要在单独import
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ElMessage: 'readonly',
        ElMessageBox: 'readonly',
        ElNotification: 'readonly'
      }
    }
  },

  js.configs.recommended,
  ...pluginVue.configs['flat/essential'],

  ...pluginOxlint.buildFromOxlintConfigFile('.oxlintrc.json'),

  // 自定义你的自定义规则
  {
    rules: {
      // vue组件名称多单词组成校验 忽略index.vue
      'vue/multi-word-component-names': [
        'warn',
        {
          ignores: ['index']
        }
      ],
      //props解构校验关闭
      'vue/no-setup-props-destructrue': ['off'],
      // 未定义变量错误提示
      'no-undef': 'error'
    }
  },

  skipFormatting
])
