import { Button } from "@material-ui/core";
import React, { Component } from "react";
import CellGrid from "../components/CellGrid"
import styles from '../styles/Products.module.scss';

export default class ProductPage extends Component {
    render() {
        return (
            <>
                <div className={styles.searchText}>
                    <span >Search results for </span>
                    <i>"Lego brik"</i>
                </div>
                <main className={styles.content}>
                    <div className={styles.filter}>
                        Left
                    </div>

                    <div className={styles.productGrid}>
                        Right
                    </div>
                </main>
            </>
        )
    }
}
