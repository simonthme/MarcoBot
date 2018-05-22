const priceIndex = require('./priceIndex');


module.exports = (payload, price, senderID) => {
  switch (payload) {
    case 'GASTRONOMY':
      priceIndex(price, ["Gastronomic"], senderID);
      break;
    case 'VEGGIE':
      priceIndex(price, ["Vegan", "Healthy", "Salad", "Gluten-free"], senderID);
      break;
    case 'BRUNCH':
      priceIndex(price, ["Breakfast", "Cake", "Pastry"], senderID);
      break;
    case 'STREET':
      priceIndex(price, ["Street-food", "Burger", "Hot-dogs", "Bagel"], senderID);
      break;
    case 'TRADITIONAL':
      priceIndex(price, ["French",],senderID);
      break;
    case 'OTHER':
      priceIndex(price, ["American", "Meat", "Italian", "French", "SeaFood", "Pasta", "Pizza"], senderID);
      break;
  }
};