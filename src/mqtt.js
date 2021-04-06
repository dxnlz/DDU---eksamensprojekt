module.exports.listen = () => {
    var mqtt = require('mqtt')
    var client = mqtt.connect('ws://broker.emqx.io:8083/mqtt')

    client.on('connect', function () {
        client.subscribe('esp/test', { qos: 0 }, function (err) {
            if (err)
                throw err;
            client.on('message', (topic, message, packet) => {
                console.log('Received Message: ' + message.toString() + '\nOn topic: ' + topic)
                const { Client } = require('pg');
                const client = new Client({
                    user: 'postgres',
                    host: 'localhost',
                    database: 'webshop',
                    password: 'postgres',
                    port: 5432,
                });

                client.connect();

                const string = message.toString();

                if (string.includes("0001") && string.includes("Incoming") || string.includes("0001") && string.includes("incoming")) {

                    const { Client } = require('pg');

                    const query_update = `
                        UPDATE test
                        SET stock = ${count}
                        WHERE productno = 1
                        `;

                    client.query(query_update, (err, res) => {
                        console.log('Data update successful');
                        client.end();
                    });
                }

                if (string.includes("0002") && string.includes("Incoming") || string.includes("0002") && string.includes("incoming")) {

                    const { Client } = require('pg');

                    const query_update = `
                        UPDATE test
                        SET stock = ${count}
                        WHERE productno = 2
                        `;

                    client.query(query_update, (err, res) => {
                        console.log('Data update successful');
                        client.end();
                    });
                }
                if (string.includes("0002") && string.includes("Outgoing") || string.includes("0002") && string.includes("outgoing")) {

                    const { Client } = require('pg');

                    const query_update = `
                        UPDATE test
                        SET stock = ${count}
                        WHERE productno = 2
                        `;

                    client.query(query_update, (err, res) => {
                        console.log('Data update successful');
                        client.end();
                    });
                }
                if (string.includes("0001") && string.includes("Outgoing") || string.includes("0001") && string.includes("outgoing")) {

                    const { Client } = require('pg');

                    const query_update = `
                        UPDATE test
                        SET stock = ${count}
                        WHERE productno = 1
                        `;

                    client.query(query_update, (err, res) => {
                        console.log('Data update successful');
                        client.end();
                    });
                    selectall();
                }
            })

        })
    })
}

function selectall(){
    const { Client } = require('pg');

    const query_select = {
        text: 'SELECT * FROM test',
        rowMode: 'array'
    };

    client.query(query_select).then(res => {

        const data = res.rows;

        console.log('all data');
        data.forEach(row => {
            console.log(`productno: ${row[0]} stock: ${row[1]}`);
        })
        client.end();
    });
}