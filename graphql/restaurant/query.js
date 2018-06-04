/**
 * Created by corentin on 13/05/2018.
 */
module.exports = {
  restaurant: `
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
  `,
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
  queryRestaurantsByPriceAndType: (PSID, type, price, page) => {
    return `{
      restaurantsByPriceAndType(PSID: ${PSID}, type: "${type}", priceRange: ${price}, page: ${page}) 
      {
       _id
    name
    description
    photos
    tags
    types
    priceRange
    location {
      name
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
      saturday {
        start
        end
      }
      sunday {
        start
        end
      }
    }
    deleted
    createAt
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