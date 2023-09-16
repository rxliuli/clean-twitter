/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_IN_EXTENSION: string
}

declare module '*?script&module' {
  const src: string
  export default src
}