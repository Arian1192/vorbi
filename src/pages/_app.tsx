import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return(
      <div theme-data="cupcake">
        <Component {...pageProps} />
      </div>
  )
}
