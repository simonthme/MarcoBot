/**
 * Created by corentin on 13/05/2018.
 */
module.exports = {
  querySites: (page) => {
    return `{
      sites(page: ${page}) {
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
