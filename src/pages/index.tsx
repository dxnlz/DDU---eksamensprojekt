import React, { Component, CSSProperties } from "react";
import styles from '../styles/Main.module.scss';

interface IndexProps {
  text: string;
}

class Index extends Component<IndexProps> {
  render() {
    return (
      <>
        <main >
        <h1 className={styles.title}>
          Webshop teknikfag
        </h1>
          <code>{this.props.text}
          </code>
        </main>
      </>
    )
  }
}

// This gets called on every request
export async function getServerSideProps() {
  console.log("Hello");
  let pageProps: IndexProps = {
    text: "Is this code??"
  }

  return { props: pageProps };
}


export default Index
