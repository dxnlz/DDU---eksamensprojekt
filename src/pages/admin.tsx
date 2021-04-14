import { Button, FormControl, FormHelperText, Input, InputLabel, Slider, TextField, Typography } from "@material-ui/core";
import React, { Component } from "react";
import CellGrid from "../components/CellGrid"
import styles from '../styles/Products.module.scss';


export interface AdminPageProps {
    
}
 
export interface AdminPageState {
    
}
 
class AdminPage extends React.Component<AdminPageProps, AdminPageState> {
    constructor(props: AdminPageProps) {
        super(props);
    }
    render() {
        return (
            <>
                <div className={styles.searchText}>
                    <span >Admin side: </span>
                    <i>"Red Lego brik"</i>
                </div>
                <main className={styles.content}>
                    <div className={styles.filter}>
                        <div className={styles.header}>
                            <Typography variant="h5">Filtering:</Typography>
                        </div>
                        <div className={styles.divider} />
                        <div className={styles.form}>
                        <FormControl>
                        <Typography id="range-slider" gutterBottom>
  P
</Typography>

                            {/* <InputLabel htmlFor="my-input">Email address</InputLabel>
                            <Input id="my-input" aria-describedby="my-helper-text" /> */}
                        </FormControl>
                        </div>

                    </div>

                    <div className={styles.productGrid}>
                        Right
                    </div>
                </main>
            </>
        )
    }
}

 
export default AdminPage;