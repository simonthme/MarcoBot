/**
 * Created by corentin on 13/05/2018.
 */
module.exports = {
  queryShops: (page) => {
    return `{
      shops(page: ${page}) {
          id
          name
          types
          description
          tags
          schedule
          priceRange
          photos
          location
        }
    }`
  }
};
