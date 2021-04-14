module.exports.listen = () => {
    var mqtt = require('mqtt')
    var client = mqtt.connect('ws://broker.emqx.io:8083/mqtt')

    client.on('connect', function () {
        client.subscribe('webshop/products', { qos: 0 }, function (err) {
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

                var the_string = message.toString();
                var result = the_string.toLowerCase();
                var parts = result.split('-', 3);
                var the_text = parts[0];
                var the_num = parseInt(parts[1]);
                var the_amount = parseInt(parts[2]);
                var new_stock_status;

                function selectAll() {
                    const query_select = {
                        text: 'SELECT * FROM products',
                        rowMode: 'array'
                    };

                    client.query(query_select).then(res => {

                        const data = res.rows;

                        console.log('ALL DATA:');
                        data.forEach(row => {
                            console.log(`id: ${row[0]} name:${row[1]} price: ${row[3]} stock: ${row[4]}`);
                        })
                    });
                }

                function find_stock_status(productno) {
                    if (the_text == "check") {
                        const query_select = {
                            text: `SELECT * FROM products WHERE id=${productno}`,
                            rowMode: 'array'
                        };

                        client.query(query_select).then(res => {

                            const data = res.rows;

                            console.log(`SPECIFIC DATA FOR PRODUCT: ${productno}`);
                            data.forEach(row => {
                                console.log(`id: ${row[0]} name: ${row[1]} price: ${row[3]} stock: ${row[4]}`);
                            })
                        });
                    }
                }

                function new_package(productno, callback) {
                    const query_select = {
                        text: `SELECT * FROM products WHERE id=${productno}`,
                        rowMode: 'array'
                    };

                        client.query(query_select).then(res => {
                            var stock_status;
                            const data = res.rows;

                        console.log(`SPECIFIC DATA FOR PRODUCT: ${productno}`);
                        data.forEach(row => {
                            stock_status = `${row[4]}`;
                            new_stock_status = parseInt(stock_status);
                            console.log(new_stock_status);
                            new_stock_status += new_amount;
                        })

                            callback();
                        });
                    }

                function remove_package(productno, callback) {
                    const query_select = {
                        text: `SELECT * FROM products WHERE id=${productno}`,
                        rowMode: 'array'
                    };

                    client.query(query_select).then(res => {
                        var stock_status;
                        const data = res.rows;

                    console.log(`SPECIFIC DATA FOR PRODUCT: ${productno}`);
                    data.forEach(row => {
                        stock_status = `${row[4]}`;
                        new_stock_status = parseInt(stock_status);
                        console.log(new_stock_status);
                        new_stock_status -= new_amount;
                    })

                        callback();
                    }); 
                }

                client.connect();

                const string = message.toString();

                if (the_text == "in") {
                    update_packages(the_num, "in", () => {
                        console.log(new_stock_status);
                        const query_update = `DO
                    $do$
                    BEGIN
                       IF EXISTS (SELECT * FROM products WHERE id=${the_num}) THEN
                          UPDATE products SET stock=${new_stock_status} WHERE id=${the_num};
                       ELSE
                          INSERT INTO products(id,stock) VALUES (${the_num},1);
                       END IF;
                    END
                    $do$
                `;

                        client.query(query_update, (err, res) => {
                            console.log('Data update successful');
                        });
                    });
                    selectAll();
                }

                if (the_text == "out") {
                    update_packages(the_num, "out", () => {
                        console.log(new_stock_status);
                        const query_update = `DO
                    $do$
                    BEGIN
                       IF EXISTS (SELECT * FROM products WHERE id=${the_num}) THEN
                          UPDATE products SET stock=${new_stock_status} WHERE id=${the_num};
                       ELSE
                          INSERT INTO products(productno,stock) VALUES (${the_num},0);
                       END IF;
                    END
                    $do$
                `;

                        client.query(query_update, (err, res) => {
                            console.log('Data update successful');
                        });
                    });
                }

                if (the_text == "check") {
                    find_stock_status(the_num);
                }
                selectAll();
            })
        })
    })
}