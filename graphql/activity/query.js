/**
 * Created by corentin on 13/05/2018.
 */
module.exports = {
  queryActivities: (page) => {
    return `{
      activities(page: ${page}) {
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
