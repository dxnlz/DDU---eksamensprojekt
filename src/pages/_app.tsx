import '../styles/globals.scss'
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { Component } from "react";
import Header from '../components/header'
import Head from 'next/head';
import type { AppProps /*, AppContext */ } from 'next/app'


class App extends Component<AppProps> {
  render() {
    return (
      <>
        <Head>
          <title>Web shop</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header path={this.props.router.asPath}/>
        <this.props.Component {...this.props.pageProps} />
      </>
    )
  } 
}

export default (opt: any) => <App {...opt}/>

