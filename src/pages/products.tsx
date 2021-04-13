import { Typography } from "@material-ui/core";
import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import Slider from "../components/Slider"
import styles from '../styles/Products.module.scss';
import { db_req } from '../db_helper'
import Cell, {ICellProps} from '../components/Cell'
import { GetServerSideProps } from "next";

interface ICategory {
    id: number;
    name: string;
}

interface FilterOptions {
    category: number;
}

interface ProductPageProps {
    categories: ICategory[];
    products: string;
    filter: FilterOptions;
}

export default class ProductPage extends Component<ProductPageProps> {
    render() {
        return (
            <>
                <div className={styles.searchText}>
                    <span >Search results for </span>
                    <div>{this.props.filter.category}</div>
                    <i>"Lego brik"</i>
                </div>
                <main className={styles.content}>
                    <div className={styles.filter}>
                        <div className={styles.header}>
                            <Typography variant="h5">Filtering:</Typography>
                        </div>
                        <div className={styles.divider} />
                        <div className={styles.form}>
                            <Form>
                                <Form.Group controlId="category">
                                    <Form.Label className={styles.label}>Kategori: </Form.Label>
                                    <Form.Control as="select" size="sm">
                                        {this.props.categories.map((option: ICategory)=>(
                                        <option key={option.id} value={option.id}>{option.name}</option>))}
                                    </Form.Control>
                                </Form.Group>
                                <hr />
                                <Form.Group controlId="priceRange">
                                    <Form.Label className={styles.label}>Pris:</Form.Label>
                                    <Slider min={0} max={69} suffix="kr." double />
                                </Form.Group>
                                <hr />
                                <Form.Group controlId="stock">
                                    <Form.Label className={styles.label}>Lager:</Form.Label>
                                    <Slider min={0} max={69} suffix="stk." />
                                </Form.Group>
                                <hr />
                                <Button variant="primary" type="submit">OK</Button>
                            </Form>
                        </div>
                    </div>

                    <div className={styles.productGrid}>
                        <div style={{display :"grid", gridTemplate: "auto / auto auto auto", gap: "1rem"}}>
                            {this.props.products.map((product)=> <Cell {...product}></Cell>)}
                        </div>
                    </div>
                </main>
            </>
        )
    }
}

// This gets called on every request
export const getServerSideProps: GetServerSideProps = async (context) => {
    let catId = Number(context.query["catid"]);
    let pageProps: ProductPageProps = {
        filter: {
            category: catId
        },
        categories: await (await db_req("SELECT * FROM categories;")).rows,
        products: JSON.parse(JSON.stringify(await (await db_req("SELECT * FROM products WHERE category = $1;", [catId])).rows))
    }

    return { props: pageProps };
}
