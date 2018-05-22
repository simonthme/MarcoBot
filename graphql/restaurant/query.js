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
          priceRange
          photos
          location{
            lat
            lng
          }
          schedule {
            monday {
              start
              end
            }
            tuesday {
              start
              end
            }
            wednesday {
              start
              end
            }
            thursday {
              start
              end
            }
            friday {
              start
              end
            }
            sunday {
              start
              end
            }
            saturday {
              start
              end
            }
          }
        }
    }`
  },
  queryRestaurantsByPriceAndType: (accountId, page, type, price) => {
    return `{
      restaurants(accountmessengers_id: ${accountId}, type: ${type}, priceRange: ${price}, page: ${page}) {
          id
          name
          types
          suggestion
          description
          tags
          priceRange
          photos
          location{
            lat
            lng
          }
          schedule {
            monday {
              start
              end
            }
            tuesday {
              start
              end
            }
            wednesday {
              start
              end
            }
            thursday {
              start
              end
            }
            friday {
              start
              end
            }
            sunday {
              start
              end
            }
            saturday {
              start
              end
            }
          }
        }
    }`
  },
  queryRestaurant: (id) => {
    return `{
      restaurant(id: "${id}") {
          id
          name
          types
          suggestion
          description
          tags
          priceRange
          photos
          location{
            lat
            lng
          }
          schedule {
            monday {
              start
              end
            }
            tuesday {
              start
              end
            }
            wednesday {
              start
              end
            }
            thursday {
              start
              end
            }
            friday {
              start
              end
            }
            sunday {
              start
              end
            }
            saturday {
              start
              end
            }
          }
        }
    }`
  }
};