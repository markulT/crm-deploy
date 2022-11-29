import '../styles/globals.css'
import {Provider, useDispatch} from 'react-redux'
import { wrapper, store } from './../storage/store'
import Layout from '../components/Layout'
import {useEffect} from "react";
import {loginByToken} from "../storage/authReducer/authReducer";

function MyApp({ Component, pageProps }) {
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(loginByToken())
    },[])

  return (
    <Layout>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </Layout>
  )
}

export default wrapper.withRedux(MyApp)
