import { GetServerSideProps } from "next";
import React, { Component } from "react";
import styles from "../styles/Main.module.scss";

class Index extends Component {
	render() {
		return (
			<>
				<main>
					<h1 className={styles.title}>Webshop teknikfag</h1>
					<code>Is this code???</code>
				</main>
			</>
		);
	}
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	return { props: {} };
};

export default Index;
