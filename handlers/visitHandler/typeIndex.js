const visitHandler = require('./visit');

module.exports = (payload, senderID) => {
  switch (payload) {
    case 'HISTORICAL':
      visitHandler(`historical`, senderID);
      break;
    case 'SECRET':
      visitHandler(`secret`, senderID);
      break;
    case 'FAMOUS':
      visitHandler(`must_see`, senderID);
      break;
    case 'CULTURAL':
      visitHandler( `cultural`, senderID);
      break;
    case 'OTHER':
      visitHandler(`other`, senderID);
      break;
  }
};