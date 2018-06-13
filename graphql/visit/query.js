
module.exports = {
  queryVisitsByPriceAndType: (PSID, type, price, page) => {
    return `{
      visitsByPriceAndType(PSID: ${PSID}, type: "${type}", page: ${page}) 
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
  }
};