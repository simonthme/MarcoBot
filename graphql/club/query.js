/**
 * Created by corentin on 13/05/2018.
 */
module.exports = {
  queryClubs: (page) => {
    return `{
      clubs(page: ${page}) {
          id
          name
          types
          description
          tags
          schedule
          priceRange
          photos
          location
          music
        }
    }`
  }
};
