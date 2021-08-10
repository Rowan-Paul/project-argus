import 'tailwindcss/tailwind.css'
import { Provider } from 'next-auth/client'
import '../styles/global.css'

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page)

  return (
    <Provider session={pageProps.session}>
      {getLayout(<Component {...pageProps} />)}
    </Provider>
  )
}

export default MyApp
