var fs = require('fs');
var path = require('path');

// Correct path to the data folder in the main project directory
var trips = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/trips.json'), 'utf8'));

/* GET travel view */
const travel = (req, res) => {
  res.render('travel', { title: 'Travlr Getaways', trips });
};

module.exports = {
  travel
};