import { FormControl, Grid, IconButton, Input, InputAdornment, InputLabel, TextField, Typography } from '@material-ui/core';
import { AccountCircle, Visibility, VisibilityOff, Lock } from '@material-ui/icons';
import React, { Component } from 'react';
import styles from '../styles/Login.module.scss'

export interface LoginPageProps {

}

export interface LoginPageState {
    brugernavn: string;
    password: string;
    showpassword: boolean;
}


class LoginPage extends Component<LoginPageProps, LoginPageState> {
    constructor(props: LoginPageProps) {
        super(props);
        this.state = {
            brugernavn: "",
            password: "",
            showpassword: false
        }
    }

    onChangeUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ brugernavn: event.target.value });
    }

    onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ password: event.target.value });
    }

    onClickShowPassword = () => {
        this.setState({ showpassword: !this.state.showpassword });
    }

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.panel}/>
                <Typography variant="h4" className={styles.title}>Webshop login</Typography>
                <div className={styles.loginContainer}>
                    {/* <div className={styles.usernameField}>

                            <AccountCircle />
                            <TextField id="username" label="Brugernavn" variant="standard" style={{ width: "25ch" }} value={this.state.brugernavn}
                                onChange={this.onChangeUsername} />
                        </div>

                        <div className={styles.usernameField}>
                        <Lock />
                        <FormControl style={{ marginTop: "16px", width: "25ch" }}>
                            <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                            <Input
                                id="password"
                                type={this.state.showpassword ? 'text' : 'password'}
                                value={this.state.password}
                                onChange={this.onChangePassword}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={this.onClickShowPassword}
                                            onMouseDown={event=>event.preventDefault()}
                                        >
                                            {this.state.showpassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        
                        </div> */}
                </div>
                <div className={styles.signup}>
                    Signup
                    </div>
                <div className={styles.loginButton}>
                    Login
                    </div>

            </div>
        );
    }
}

export default LoginPage;
