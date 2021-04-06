import '../styles/globals.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../styles/Main.module.scss';

import React, { Component } from "react";
import Header from '../components/header'
import Head from 'next/head';
import NextApp from 'next/app'

import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import { ThemeProvider as MaterialThemeProvider, createMuiTheme, StylesProvider } from '@material-ui/core/styles';

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
            <Header path={this.props.router.asPath} />
            <div className={styles.root}>
              <this.props.Component {...this.props.pageProps} />
            </div>
          </MaterialThemeProvider>
        </StyledThemeProvider>
      </StylesProvider>
    )
  }
}

export default (opt: any) => <App {...opt} />

