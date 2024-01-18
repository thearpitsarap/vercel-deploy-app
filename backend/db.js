const mongoose = require('mongoose');

const uri = 'mongodb+srv://thearpitsarap:arpitsarap@arpitcluster.dbmdrpr.mongodb.net/data?retryWrites=true&w=majority&ssl=true&tlsAllowInvalidCertificates=true';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const dataSchema = new mongoose.Schema({
  keyword: String,
  searchVolume: String,
  competition: String,
})

const data = mongoose.model('task', dataSchema);

module.exports = { data };