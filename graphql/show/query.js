/**
 * Created by corentin on 13/05/2018.
 */
module.exports = {
  queryShows: (page) => {
    return `{
      shows(page: ${page}) {
          id
          name
          types
          category
          description
          tags
          priceRange
          photos
          dateStart
          dateEnd
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
  queryShow: (id) => {
    return `{
      show(id: "${id}") {
          id
          name
          types
          category
          description
          tags
          priceRange
          photos
          dateStart
          dateEnd
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
