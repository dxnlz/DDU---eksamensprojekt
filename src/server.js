const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'webshop',
    password: 'postgres',
    port: 5432,
});

client.connect();

const query = `
CREATE TABLE IF NOT EXISTS test (
    productNo int,
    stock int
);
`;

client.query(query, (err, res) => {
  if (err) {
      console.error(err);
      return;
  }
  console.log('Table is successfully created');
  client.end();
});

const mqtt = require('./mqtt')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

mqtt.listen();

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true)
    const { pathname, query } = parsedUrl
    handle(req, res, parsedUrl)
  }).listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
