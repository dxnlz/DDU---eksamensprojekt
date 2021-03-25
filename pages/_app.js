import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../components/header'

export default function MyApp({ Component, pageProps }) {
    return (
      <>
        <Header />
        <Component {...pageProps} />
      </>
    )
  }