/**
 * Created by corentin on 29/08/2018.
 */
const district1 = require('./district1');
const district2 = require('./district2');
const district3 = require('./district3');
const district4 = require('./district4');

const index = (page) => {
  switch(page) {
    case 1:
      return district1;
    case 2:
      return district2;
    case 3:
      return district3;
    case 4:
      return district4;
    default:
      break;
  }
};

module.exports = index;