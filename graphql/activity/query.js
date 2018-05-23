/**
 * Created by corentin on 13/05/2018.
 */
module.exports = {
  queryActivities: (page) => {
    return `{
      activities(page: ${page}) {
          id
          name
          types
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
  queryActivity: (id) => {
    return `{
      activity(id: "${id}") {
          id
          name
          types
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
