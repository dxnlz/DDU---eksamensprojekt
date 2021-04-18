import '../styles/globals.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../styles/Main.module.scss';

import React from 'react'

import NextApp from 'next/app'
import Head from 'next/head';

import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import { ThemeProvider as MaterialThemeProvider, createMuiTheme, StylesProvider } from '@material-ui/core/styles';

import CookieConsent from 'react-cookie-consent';
import Header from '../components/Header'
import { GetProfileStatus, IProfileStatus } from '../lib/auth_helper';

const theme = {
  primary: '#ffaabb',
  ...createMuiTheme()
}

class App extends NextApp {
  componentDidMount() {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles && jssStyles.parentNode)
      jssStyles.parentNode.removeChild(jssStyles)
  }

  render() {
    return (
      <StylesProvider injectFirst>
        <StyledThemeProvider theme={theme}>
          <MaterialThemeProvider theme={theme}>
            <Head>
              <title>Web shop</title>
              <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header path={this.props.router.asPath} profile={(this.props as any).profile as IProfileStatus} />
            <CookieConsent>This website uses cookies to enhance the user experience.</CookieConsent>
            <div className={styles.root}>
              <this.props.Component profile={(this.props as any).profile as IProfileStatus} {...this.props.pageProps} />
            </div>
          </MaterialThemeProvider>
        </StyledThemeProvider>
      </StylesProvider>
    )
  }
}

function getCookie(cookiename, cookies) {
  var cookiestring = RegExp(cookiename + "=[^;]+").exec(cookies);
  return decodeURIComponent(!!cookiestring ? cookiestring.toString().replace(/^[^=]+./, "") : "");
}

App.getInitialProps = async (appContext) => {
  const appProps = await NextApp.getInitialProps(appContext);
  let token = getCookie("token", appContext.ctx.req.headers.cookie);
  let myprofile = GetProfileStatus(token);
  return { profile: myprofile, ...appProps }
}

export default App;