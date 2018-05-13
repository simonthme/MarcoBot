/**
 * Created by corentin on 13/05/2018.
 */
module.exports = {
  queryBars: (page) => {
    return `{
      bars(page: ${page}) {
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