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
            name
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
  queryRestaurantsByPriceAndType: (accountId, type, price, page) => {
    console.log(accountId);
    console.log(page);
    console.log(price);
    console.log(type);
    console.log(`{
      restaurantsByPriceAndType(accountmessengers_id: ${accountId}, type: [${type}], priceRange: ${price}, page: ${page}) 
      {
       _id
       name
       photos
       tags
       types
       description
       deleted
      }
    }`);
    return `{
      restaurantsByPriceAndType(accountmessengers_id: ${accountId}, type: ${type}, priceRange: ${price}, page: ${page}) 
      {
       _id
       name
       photos
       tags
       types
       description
       deleted
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
            name
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