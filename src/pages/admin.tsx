import { GetServerSideProps } from "next";
import React, { Component } from "react";
import { getCookie, GetProfileStatus, IProfileStatus, IUser } from "../lib/auth_helper";
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

interface AdminPageState {
  userRow: any;
}

class AdminPage extends Component<AdminPageProps, AdminPageState> {
  constructor(props: AdminPageProps) {
    super(props);
    this.state = {
      userRow: undefined
    }
  }

  componentDidMount() {
    window.moment = moment;
    console.log(this.props.products)
  }

  render() {
    if (!this.props.profile.isAdmin || !this.props.profile.isLoggedIn)
      return <Error statusCode={403} title="FORBIDDEN: This user doesn't have admin rights" />
    else
      return (
        <div className={styles.container}>
          <div className={`${styles.edit} ${styles.tile}`}>
            <div className={styles.header}>{this.state.userRow? "Edit" : "Create"} product</div>
            {this.state.userRow? JSON.stringify(this.state.userRow._row.data, null, 4) : "Nothing"}
          </div>

          <div className={`${styles.product} ${styles.tile}`}>
            <div className={styles.header}>Products</div>
            <ReactTabulator
              columns={[
                { title: 'Id', field: 'id' },
                { title: 'Name', field: 'name' },
                { title: 'Description', field: 'description'},
                { title: 'Price', field: 'price', formatter: "money", formatterParams: {symbol: " kr.", symbolAfter: true} },
                { title: 'Stock', field: 'stock'},
                { title: 'Category', field: 'category_name'}
              ]}
              options={{selectable: true,
                rowSelected: (row) => {
                  console.log(row._row)
                  if(this.state.userRow == undefined)
                    this.setState({
                      userRow: row
                    })
                  else if (this.state.userRow != row){
                    this.state.userRow.deselect();
                    this.setState({
                      userRow: row
                    })
                  }
                },
                rowDeselected: (row) => {
                  this.setState({
                    userRow: undefined
                  })
                }}}
              data={this.props.products ? this.props.products : []}
              className={styles.table}
            />
          </div>

          <div className={`${styles.user} ${styles.tile}`}>
            <div className={styles.header}>Users</div>
            <ReactTabulator
              columns={[
                { title: 'Id', field: 'id' },
                { title: 'Name', field: 'username' },
                { title: 'Birthday', field: 'birthday', formatter: "datetime", formatterParams: { outputFormat: "YYYY-MM-DD" } },
                { title: 'Country', field: 'country_name' },
                { title: 'Admin', field: 'isadmin', formatter: "tickCross" }
              ]}
              data={this.props.users ? this.props.users : []}
              className={styles.table}
            />
          </div>
        </div>
      )
  }
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  let token = getCookie("token", context.req.headers.cookie);
  let myprofile = GetProfileStatus(token);
  if (myprofile.isAdmin) 
    return {
      props: {
        users: JSON.parse(JSON.stringify((await db_req("SELECT users.id, username, birthday, country_name, isadmin FROM users INNER JOIN countries ON users.country=countries.id;")).rows)),
        products: JSON.parse(JSON.stringify((await db_req("SELECT products.id, products.name, categories.name as category_name, price, stock, description FROM products INNER JOIN categories ON products.category=categories.id;")).rows))
      }
    };  
  else
    return { props: {} };
}

export default AdminPage;