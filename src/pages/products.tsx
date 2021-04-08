import { Typography } from "@material-ui/core";
import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import Slider from "../components/Slider"
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
                        <div className={styles.header}>
                            <Typography variant="h5">Filtering:</Typography>
                        </div>
                        <div className={styles.divider} />
                        <div className={styles.form}>
                            <Form>
                            <Form.Group controlId="exampleForm.SelectCustomSizeSm">
    <Form.Label  style={{color: "white", fontWeight: "bold"}}>Kategori: </Form.Label>
    <Form.Control as="select" size="sm" custom>
      <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
      <option>5</option>
    </Form.Control>
  </Form.Group>
  <hr/>

                                <Form.Group controlId="formBasicRangeCustom">
                                    <Form.Label style={{color: "white", fontWeight: "bold"}}>Pris:</Form.Label>
                                    <Slider min={0} max={69} suffix="kr." double/>
                                </Form.Group>
                                <hr/>
                                <Form.Group controlId="formBasicRangeCustom">
                                <Form.Label style={{color: "white", fontWeight: "bold"}}>Lager:</Form.Label>
                                <Slider min={0} max={69} suffix="stk."/>
                            </Form.Group>
                            <hr/>

                                <Button variant="primary" type="submit">OK</Button>
                            </Form>
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
