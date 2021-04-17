import { GetServerSideProps } from "next";
import React, { Component } from "react";
import { IProfileStatus } from "../lib/auth_helper";
import Error from 'next/error'

interface AdminPageProps {
  profile: IProfileStatus;
}

class AdminPage extends Component<AdminPageProps> {
  render() {
    if(!this.props.profile.isAdmin || !this.props.profile.isLoggedIn)
      return <Error statusCode={403} title="FORBIDDEN: This user doesn't have admin rights"/>
    else
      return (
        <div>
          Admin page, 
        </div>
      )
  }
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return { props: {} };
}

export default AdminPage;