/**
 * Created by corentin on 13/05/2018.
 */
module.exports = {
  queryParcs: (page) => {
    return `{
      parcs(page: ${page}) {
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
