import { GetServerSideProps } from "next";
import React, { Component } from "react";
import { IProfileStatus, IUser } from "../lib/auth_helper";
import Error from 'next/error'
import styles from '../styles/Admin.module.scss'
import Table from "../components/Table";
import { ReactTabulator } from "react-tabulator";
import { ICellProps } from "../components/Cell";
import { db_req } from "../lib/db_helper";
import moment from 'moment'



interface AdminPageProps {
  profile: IProfileStatus;
  users: IUser[];
  products: ICellProps[];
}

let mydata: any[] = [];
for (let i = 0; i < 200; i++) {
  mydata = [{
    time: 1,
    temperature: 2,
    pressure: 3,
    height: 4
  }, ...mydata]
}

class AdminPage extends Component<AdminPageProps> {
  constructor(props: AdminPageProps) {
    super(props);
    if(props.users == undefined)
      props = { users: [], ...props }
    if(props.products == undefined)
      props = { products: [], ...props }
  }

  componentDidMount() {
    window.moment = moment;
  }

  render() {
    if (!this.props.profile.isAdmin || !this.props.profile.isLoggedIn)
      return <Error statusCode={403} title="FORBIDDEN: This user doesn't have admin rights" />
    else
      return (
        <div className={styles.container}>
          <div className={`${styles.edit} ${styles.tile}`}>
            <div className={styles.header}>Edit product</div>
          </div>

          <div className={`${styles.product} ${styles.tile}`}>
            <div className={styles.header}>Products</div>
          </div>

          <div className={`${styles.user} ${styles.tile}`}>
            <div className={styles.header}>Users</div>
            <div style={{ flex: 1, overflow: "hidden" }}>
              <ReactTabulator
                columns={[
                  { title: 'Id', field: 'id' },
                  { title: 'Name', field: 'username'},
                  { title: 'Birthday', field: 'birthday', formatter: "datetime", formatterParams: {outputFormat:"YYYY-MM-DD"}},
                  { title: 'Country', field: 'country_name' },
                  { title: 'Admin', field: 'isadmin', formatter: "tickCross" }
                ]}
                data={this.props.users}
                className={styles.table}
              />
            </div>
          </div>
        </div>
      )
  }
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return { props: {
    users: JSON.parse(JSON.stringify(await (await db_req("SELECT users.id, username, birthday, country_name, isadmin FROM users INNER JOIN countries on users.country=countries.id;")).rows))
  } };
}

export default AdminPage;