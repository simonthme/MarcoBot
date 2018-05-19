module.exports = {
  queryUser: (id) => {
    return `{
      user(id: "${id}") {
          id,
          firstName,
          lastName,
          createAt,
          gender,
          deleted,
          geoLocation {
            lat,
            lng,
            lastUpdated
          }
        }
    }`
  },
  queryUserByAccountMessenger: (id) => {
    return `{
      userByAccountMessenger(accountmessengers_id: "${id}") {
          id,
          firstName,
          lastName,
          createAt,
          gender,
          deleted,
          geoLocation {
            lat,
            lng,
            lastUpdated
          }
        }
    }`
  },

};