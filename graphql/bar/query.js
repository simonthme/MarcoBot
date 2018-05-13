/**
 * Created by corentin on 13/05/2018.
 */
module.exports = {
  queryBars: (page) => {
    return `{
      bars(page: ${page}) {
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