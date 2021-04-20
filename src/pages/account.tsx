import React, { Component } from 'react';
import { FormControl, IconButton, Input, InputAdornment, InputLabel, TextField, Typography, Button } from '@material-ui/core';
import { GetServerSideProps } from "next";

export interface AccountPageProps {
    profile: userProfile;
}

export interface AccountPageState {
}

export interface userProfile {
    userPicture: string;
}

class AccountPage extends Component<AccountPageProps, AccountPageState> {
    constructor(props: AccountPageProps) {
        super(props);
    }

    setHarambe = async () => {
        this.props.profile.userPicture = "https://www.telegraph.co.uk/content/dam/news/2016/11/09/99356270-Harambe-gorilla-us-election-votes_jpg_trans_NvBQzQNjv4BqqVzuuqpFlyLIwiB6NTmJwfSVWeZ_vEN7c6bHu2jJnT8.jpg";
        console.log(this.props.profile.userPicture);
    }

    render() {
        return (
            <div>
                <div>
                    <h1>Account Page</h1>
                    <img src={this.props.profile.userPicture} />
                </div>

                <div>
                    <Button variant="contained" color="primary" onClick={this.setHarambe}>Set Harambe</Button>
                </div>
            </div>
        );
    }
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    return { props: {} };
}

export default AccountPage;
