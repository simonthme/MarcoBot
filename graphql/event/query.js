/**
 * Created by corentin on 13/05/2018.
 */
module.exports = {
  queryEvents: (page) => {
    return `{
      events(page: ${page}) {
          id
          name
          types
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
