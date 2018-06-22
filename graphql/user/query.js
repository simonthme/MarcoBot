module.exports = {
  queryUser: (id) => {
    return `{
      user(id: "${id}") {
          id,
          PSID,
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
      userByAccountMessenger(PSID: "${id}") {
          id,
          PSID,
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