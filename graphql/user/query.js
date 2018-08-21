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
          isTalkingToHuman,
          cityTraveling,
          departureDateToCity,
          isItFirstTimeCity,
          arrivalDateToCity,
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
          isTalkingToHuman,
          cityTraveling,
          isItFirstTimeCity,
          departureDateToCity,
          arrivalDateToCity,
          geoLocation {
            lat,
            lng,
            lastUpdated
          }
        }
    }`
  },

};
