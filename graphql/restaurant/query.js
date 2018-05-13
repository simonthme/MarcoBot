/**
 * Created by corentin on 13/05/2018.
 */
module.exports = {
  queryRestaurants: (page) => {
    return `{
      restaurants(page: ${page}) {
          id
          name
          types
          suggestion
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