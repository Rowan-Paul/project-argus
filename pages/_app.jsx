import 'tailwindcss/tailwind.css'
import '../styles/global.css'
import '../styles/navBar.css'
import { Provider } from 'next-auth/client'

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page)

  return (
    <Provider session={pageProps.session}>
      {getLayout(<Component {...pageProps} />)}
    </Provider>
  )
}

export default MyApp
