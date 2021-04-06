import { Button } from "@material-ui/core";
import React, { Component } from "react";
import CellGrid from "../components/CellGrid"
import styles from '../styles/Products.module.scss';

export default class ProductPage extends Component {
    render() {
        return (
            <div style={{flex: "1 1 auto", flexDirection: "column", justifyItems: "stretch", display:"flex"}}>
                <div className={styles.searchText}>
                    <span >Search results for </span>
                    <i>"Lego brik"</i>
                </div>

                <main style={{display: "flex", flex: 1,alignItems: "stretch", justifyItems: "stretch", marginBottom: "1rem"}}>
                    <div style={{display: "flex", flex: 1, backgroundColor: "blue", alignItems: "center", justifyContent: "center", marginRight: "1rem", borderRadius: "4px"}}>
                        Left
                    </div>

                    <div  style={{display: "flex", flex: 3, backgroundColor: "red", alignItems: "center", justifyContent: "center", borderRadius: "4px"}}>
                        Right
                    </div>
                </main>

                
                
            </div>
        )
    }
}
