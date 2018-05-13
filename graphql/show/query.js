/**
 * Created by corentin on 13/05/2018.
 */
module.exports = {
  queryShows: (page) => {
    return `{
      shows(page: ${page}) {
          id
          name
          types
          category
          description
          tags
          schedule
          priceRange
          photos
          location
          dateStart
          dateEnd
        }
    }`
  }
};
