import { Avatar, Grid, Paper, Typography } from "@material-ui/core";
import React, { Component } from "react";
import styles from "../styles/Review.module.scss";

export interface IReview {
    id: number;
    stars: number;
    review: string;
    author: number;
    created: Date;
    product: number;
    last_updated: Date;
}

export default class Review extends Component<IReview> {
    render() {
        return (
            <Paper className={styles.paper}>
                <Grid container wrap="nowrap" spacing={2}>
                    <Grid item>
                        <Avatar>EB</Avatar>
                    </Grid>
                    <Grid item xs>
                        <Typography variant="h6">{this.props.author}</Typography>
                        <Typography>{this.props.review}</Typography>
                        <Typography>Rating: {this.props.stars}</Typography>
                    </Grid>
                </Grid>
            </Paper>
        );
    }
}