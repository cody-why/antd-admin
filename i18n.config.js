module.exports = {
  input: 'src',
  output: '',
  exclude: ['**/node_modules/**/*','src/pages/charts/*'],
  rules: {
    
    ts: {
      caller: '',
      functionName: 't',
      customizeKey: function getCustomizeKey(key, path) {
        return key
      },
      importDeclaration: 'import { t } from "i18next"',
    },
    
    tsx: {
      caller: '',
      functionName: 't',
      customizeKey: function getCustomizeKey(key, path) {
        return key
      },
      importDeclaration: 'import { t } from "i18next"',
      functionSnippets: '',
    },
    
  },
  prettier: { semi: false, singleQuote: true },
  incremental: false,
  skipExtract: false, // 跳过提取中文阶段
  localePath: './translate/zh-CN.json',
  localeFileType: 'json',
  excelPath: './locales.xlsx',
  exportExcel: false,
  skipTranslate: true, // 跳过翻译语言包阶段。默认不翻译
  locales: ['en-US'],
  globalRule: { ignoreMethods: [] },
  adjustKeyMap: function (allKeyValue, currentFileKeyMap, currentFilePath) {
    return allKeyValue
  },
}
