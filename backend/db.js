const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const name = process.env.NAME;
const pass = process.env.PASSWORD;
const uri = `mongodb+srv://${name}:${pass}@arpitcluster.dbmdrpr.mongodb.net/data?retryWrites=true&w=majority&ssl=true&tlsAllowInvalidCertificates=true`;

mongoose.connect(uri);

const dataSchema = new mongoose.Schema({
  keyword: String,
  searchVolume: String,
  competition: String,
})

const data = mongoose.model('task', dataSchema);

module.exports = { data };