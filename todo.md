# 运行起来
- 添加.env文件:
    - REACT_APP_BASE_URL='http://localhost:8000'
    - REACT_APP_BASENAME=''
- `npm install @craco/craco --save`
- `npm start`
- 修改package.json, `"craco-less": "^3.0.0",`
# 添加功能
- 添加密码加密: `npm install md5 `
- 添加多语言支持
    - 安装依赖：`npm install react-i18next i18next i18next-browser-languagedetector `
    - 翻译文件目录：`src/locales/`
- 添加"@/utils/storageUtils"路径支持
    - 添加paths.json, 修改tsconfig.json,添加: "extends":"./paths.json"
    - 修改craco.config.js,添加webpack:{}
- 不能升级的版本: "typescript": "^4.9.5",由于react-scripts的版本限制,只能用v4版本.
    "web-vitals": "^2.1.4",,"http-proxy-middleware": "^2.0.6",这些都不能升级
- 调试的时候,useEffect会请求2次,是因为React.StrictMode
- 自动提取文字国际化: it -c i18n.config.js #https://github.com/IFreeOvO/i18n-cli/tree/main/packages/i18n-extract-cli
    然后用自己的翻译 `cd translate && mytl`
- 添加多标签页