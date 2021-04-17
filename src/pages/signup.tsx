import { GetServerSideProps } from 'next';
import Router from 'next/router';
import React, { Component } from 'react'
import { IProfileStatus, IUser } from '../lib/auth_helper'

interface SignupPageProps {
    profile: IProfileStatus;
}

class SignupPage extends Component<SignupPageProps> {

    onSignup = async (event) => {
        console.log("Signing up");

        let user_data: IUser = {
            id: 0,
            username: "hedsao1",
            registered: new Date(),
            password: "abcdef",
            isadmin: false
        }

        try {
            const loginApi = await fetch(`/api/signup`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user_data),
            });

            let result = await loginApi.json();

            if (result.success) {
                Router.push('/login');
            } else {
                alert("Error: " + result.error)
            }

        } catch (error) {
            alert("Error: " + error)
        }
    }

    handleClick = () => {
        console.log('this is:', this);
    }

    render() {
        return (
            <div style={{ flex: "1", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <button type="button" onClick={this.onSignup}>Signup</button>
                <button onClick={this.handleClick}>
                    Click me
      </button>
            </div>

        )
    }
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    return { props: {} };
}

export default SignupPage;