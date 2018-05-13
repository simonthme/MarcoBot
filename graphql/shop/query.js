/**
 * Created by corentin on 13/05/2018.
 */
module.exports = {
  queryShops: (page) => {
    return `{
      shops(page: ${page}) {
          id
          name
          types
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
