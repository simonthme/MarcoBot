/**
 * Created by corentin on 13/05/2018.
 */
module.exports = {
  queryMuseums: (page) => {
    return `{
      museums(page: ${page}) {
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
  },
  queryMuseum: (id) => {
    return `{
      museum(id: ${id}) {
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