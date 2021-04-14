//Gredal blank page for admin.tsx

import * as React from 'react';
import { Component } from 'react';

export interface AdminPageProps {
    
}
 
export interface AdminPageState {
    
}
 
class AdminPage extends React.Component<AdminPageProps, AdminPageState> {
    constructor(props: AdminPageProps) {
        super(props);
    }
    render() { 
        return ( <div>admin</div> );
    }
}
 
export default AdminPage;

/*something I thought of using

module.exports.listen = () => {
    const { Client } = require('pg');
    const client = new Client({
        user: 'postgres',
        host: 'localhost',
        database: 'webshop',
        password: 'postgres',
        port: 5432,
    });

    client.connect();

    function findUsers() {
        const query_select = {
            text: 'SELECT * FROM users',
            rowMode: 'array'
        };

        client.query(query_select).then(res => {
            const data = res.rows;
            console.log('User logins:');
            data.forEach(row => {
                console.log(`username: ${row[1]} password: ${row[5]}`);
            })
        });
    }
}

*/