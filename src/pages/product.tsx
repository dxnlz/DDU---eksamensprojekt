import { Typography } from "@material-ui/core";
import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import Slider from "../components/Slider"
import styles from '../styles/Products.module.scss';
import { db_req } from '../db_helper'
import Cell, {ICellProps} from '../components/Cell'
import { GetServerSideProps } from "next";
import DefaultErrorPage from 'next/error'

interface ICategory {
    id: number;
    name: string;
}

interface ProductPageProps {
    id: number
}

export default class ProductPage extends Component<ProductPageProps> {
    render() {
        if(this.props.id == NaN)
            return (<DefaultErrorPage statusCode={404} />)

        return (
            <>
                <main className={styles.content}>
                    
                    <div style={{flex: 1, backgroundColor: "red"}}>
                        dasdasd: {this.props.id}
                    </div>
                    {/* <div className={styles.filter}>
                        <div className={styles.header}>
                            <Typography variant="h5">Filtering:</Typography>
                        </div>
                        <div className={styles.divider} />
                        <div className={styles.form}>
                            
                            
                        </div>
                    </div>

                    <div className={styles.productGrid}>
                        
                    </div> */}
                </main>
                
            </>
        )
    }
}

// This gets called on every request
export const getServerSideProps: GetServerSideProps = async (context) => {
    let pageProps: ProductPageProps = {
        id: Number(context.query["id"])
    }

    return { props: pageProps };
}
