/**
 * Created by corentin on 19/05/2018.
 */
module.exports = {
  queryGoing: (id) => {
    return `{
      later(id: "${id}") {
           id
          activities_id
          bars_id
          clubs_id
          events_id
          exhibitions_id
          museums_id
          parcs_id
          restaurants_id
          shops_id
          shows_id
          sites_id
          users_id
          lastClick         
      }
    }`
  },
  queryGoings: (userID, limit) => {
    return `{
      laters(users_id: "${userID}", limit: ${limit}) {
           id
          activities_id
          bars_id
          clubs_id
          events_id
          exhibitions_id
          museums_id
          parcs_id
          restaurants_id
          shops_id
          shows_id
          sites_id
          users_id
          lastClick         
      }
    }`
  },
};