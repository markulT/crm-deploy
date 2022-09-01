import '../styles/globals.css'
import { Provider } from 'react-redux'
import { wrapper, store } from './../storage/store'
import Layout from '../components/Layout'

function MyApp({ Component, pageProps }) {

  return (
    <Layout>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </Layout>
  )
}

export default wrapper.withRedux(MyApp)
