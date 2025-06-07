/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly REACT_APP_BASE_URL: string
    readonly REACT_APP_BASENAME: string
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare global {
  interface Window {
    APP_CONFIG: {
      BASE_URL: string;
    };
  }
} 