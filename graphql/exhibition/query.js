/**
 * Created by corentin on 13/05/2018.
 */
module.exports = {
  queryExhibitions: (page) => {
    return `{
      exhibitions(page: ${page}) {
          id
          name
          types
          tags
          description
          priceRange
          photos
          dateStart
          dateEnd
          museums_id
        }
    }`
  }
};