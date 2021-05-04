import React, { Component } from "react";

import { GetServerSideProps } from "next";
import DefaultErrorPage from 'next/error'

import { Avatar, Button, Grid, Typography, Paper } from '@material-ui/core'
import { ArrowBack } from '@material-ui/icons'
import Rating from '@material-ui/lab/Rating';

import styles from '../styles/Product.module.scss';
import { db_req } from '../lib/db_helper'
import { ICellProps } from '../components/Cell'

interface ProductPageProps {
    id: number;
    product?: ICellProps;
}

const message = `Truncation should be conditionally applicable on this long line of text
 as this is a much longer line than what the container can support. `;

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
                            <div className={styles.productReview}>
                                <div>
                                    <Paper className={styles.paper}>
                                        <Grid container wrap="nowrap" spacing={2}>
                                            <Grid item>
                                                <Avatar>EB</Avatar>
                                            </Grid>
                                            <Grid item xs>
                                            <Typography variant="h6">Emil Biørn</Typography>
                                                <Typography>{message}</Typography>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                    <Paper className={styles.paper}>
                                        <Grid container wrap="nowrap" spacing={2}>
                                            <Grid item>
                                                <Avatar>MG</Avatar>
                                            </Grid>
                                            <Grid item xs>
                                            <Typography variant="h6">Mathias Gredal</Typography>
                                                <Typography>nice men!</Typography>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                    <Paper className={styles.paper}>
                                        <Grid container wrap="nowrap" spacing={2}>
                                            <Grid item>
                                                <Avatar>DS</Avatar>
                                            </Grid>
                                            <Grid item xs>
                                            <Typography variant="h6">Daniel Schmidt</Typography>
                                                <Typography>nice men!</Typography>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                    <Paper className={styles.paper}>
                                        <Grid container wrap="nowrap" spacing={2}>
                                            <Grid item>
                                                <Avatar>NH</Avatar>
                                            </Grid>
                                            <Grid item xs>
                                            <Typography variant="h6">Niklas Haim</Typography>
                                                <Typography>nice men!</Typography>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                    <Paper className={styles.paper}>
                                        <Grid container wrap="nowrap" spacing={2}>
                                            <Grid item>
                                                <Avatar>DJ</Avatar>
                                            </Grid>
                                            <Grid item xs>
                                            <Typography variant="h6">David Jacobsen</Typography>
                                                <Typography>nice men!</Typography>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                    <Paper className={styles.paper}>
                                        <Grid container wrap="nowrap" spacing={2}>
                                            <Grid item>
                                                <Avatar>MG</Avatar>
                                            </Grid>
                                            <Grid item xs>
                                            <Typography variant="h6">Mathias Gredal</Typography>
                                                <Typography>nice men!</Typography>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </div>
                            </div>
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

        return { props: pageProps };
    }

    return { props: { id: null } };
}
