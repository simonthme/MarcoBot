/**
 * Created by corentin on 13/05/2018.
 */
module.exports = {
  querySites: (page) => {
    return `{
      sites(page: ${page}) {
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
  querySite: (id) => {
    return `{
      site(id: "${id}") {
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
