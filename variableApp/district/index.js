/**
 * Created by corentin on 29/08/2018.
 */
const districtParis = require('./paris/index');
const districtLondon = require('./london/index');
const districtBarcelona = require('./barcelona/index');

const index = (city, page) => {
  switch (city) {
    case 'paris':
      return districtParis(page);
    case 'london':
      return districtLondon(page);
    case 'barcelona':
      return districtBarcelona(page);
    default:
      break;
  }
};

module.exports = index;