/**
 * Created by corentin on 13/05/2018.
 */
module.exports = {
  queryParcs: (page) => {
    return `{
      parcs(page: ${page}) {
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
  queryParc: (id) => {
    return `{
      parc(id: "${id}") {
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
