/**
 * Created by corentin on 13/06/2018.
 */
module.exports = (params, senderID) => {
  let messageData = {
    recipient: {
      id: senderID
    },
    message: ''
  };
  const tempParams = params.split("_");
  const type = tempParams[0];
  const tempParams2 = tempParams[1].split(":");
  const price = tempParams2[0];
  const page  = tempParams2[1];
  const recommandationApi = new ApiGraphql(config.category[config.indexCategory].recommendationApilUrl, config.accessTokenRecommendationApi);
  recommandationApi.sendQuery(restaurant.queryRestaurantsByPriceAndType(senderID, type, price, page));
  then(res => {
    if (res.restaurantsByPriceAndType.length > 0 && res.restaurantsByPriceAndType !== null) {
      return product_data.templateList(res.restaurantsByPriceAndType,
        "RESTAURANT", 0, "neo4j", type, price)
    } else {
      return product_data.jokeMarco;
    }
  })
    .then(result => {
      delete messageData.sender_action;
      messageData.message = result;
      return apiMessenger.sendToFacebook(messageData);
    })
    .then(res => {
      console.log('end restaurants');
    })
    .catch(err => {
      console.log(err.response.data.error);
    });
};