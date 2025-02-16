// https://vitejs.dev/guide/env-and-mode.html

type ImportMetaEnv = {
  readonly VITE_APP_ENV: string
  readonly VITE_APP_PORT: string
  readonly VITE_API_HOST: string
}

// Cannot use `type` here because ImportMeta was a pre-defined type
interface ImportMeta {
  readonly env: ImportMetaEnv
}
