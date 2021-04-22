import React, { Component } from "react";

import { GetServerSideProps } from "next";
import DefaultErrorPage from 'next/error'

import { Button, Typography } from '@material-ui/core'
import { ArrowBack } from '@material-ui/icons'
import Rating from '@material-ui/lab/Rating';

import styles from '../styles/Product.module.scss';
import { db_req } from '../lib/db_helper'
import { ICellProps } from '../components/Cell'

interface ProductPageProps {
    id: number;
    product?: ICellProps;
}

export default class ProductPage extends Component<ProductPageProps> {
    render() {
        if (this.props.id == NaN || this.props.id == undefined)
            return (<DefaultErrorPage statusCode={404} />)

        return (
            <>
                <main className={styles.content}>
                    <div className={styles.left}>
                        <Button onClick={() => window.history.back()} className={styles.back}>
                            <ArrowBack /> Go back!
                            </Button>

                        <div className={styles.order}>
                            <div className={styles.header}>
                                <Typography variant="h5">Order now:</Typography>
                            </div>
                            <div className={styles.divider} />
                            <div className={styles.form}>
                                <form>
                                    <label className={styles.label} htmlFor="quantity">Quantity:</label>
                                    <input className={styles.input} type="number" id="quantity" name="quantity" min="1" max={this.props.product.stock}></input>
                                    <div>
                                    <Button variant="contained" color="primary" type="submit">BUY NOW!</Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                            </div>

                            <div className={styles.productContainer}>
                                <div className={styles.productInfo}>
                                    <Typography variant="h5">{this.props.product.name}</Typography>
                                    <hr />
                                    <b>Rating:</b>
                                    <br />
                                    <Rating name="size-large" defaultValue={2.4} size="large" style={{ color: "red" }} />
                                    <br />
                                    <b>Info:</b>
                                    <Typography variant="body1">
                                        <blockquote>{this.props.product.description}</blockquote></Typography>
                                    <Typography variant="body1"><b>Price:</b> {this.props.product.price} dkk</Typography>
                                    <Typography variant="body1"><b>Stock:</b> {this.props.product.stock}</Typography>

                                </div>
                                <div className={styles.verticaldivider} />

                                <div className={styles.productRight}>
                                    <div className={styles.productImage}>Image</div>
                                    <div className={styles.divider} />
                                    <div className={styles.productReview}>Reviews</div>
                                </div>

                            </div>
                </main>

            </>
        )
    }
}

// This gets called on every request
export const getServerSideProps: GetServerSideProps = async (context) => {
                        let productId = Number(context.query["id"]);
    if (Number.isSafeInteger(productId)) {
                        let pageProps: ProductPageProps = {
                        id: productId,
            product: JSON.parse(JSON.stringify(await (await db_req("SELECT * FROM products WHERE id = $1", [productId])).rows[0]))
        }

        return {props: pageProps };
    }

    return {props: {id: null } };
}
