const fetch = require('node-fetch');
const dotenv = require('dotenv');

dotenv.config();

console.log(`Addy to be checked is: ${process.env.address}`);
