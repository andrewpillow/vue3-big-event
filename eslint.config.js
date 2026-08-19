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

  {
    languageOptions: {
      globals: {
        ...globals.browser
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
    // elmessage能调用 但是报错
    // 因为之前配置了自动导入 但是vscode不知道 所以需要配置
    // 报错
    // languageOptions: {
    //   globals: {
    //     ElMessage: 'readon1y',
    //     ElMessgaeBox: 'readon1y',
    //     ElLoading: 'readon1y'
    //   }
    // }
  },

  skipFormatting
])
