module.exports = {
  createUser: () => {
    return `mutation createUser($accountmessengers_id: ID!, $firstName: String, $lastName: String, $gender: String, $profilePic: String){
        createUser(accountmessengers_id: $accountmessengers_id, firstName: $firstName, lastName: $lastName, gender: $gender, profilePic: $profilePic) {
           id
          firstName,
          lastName,
          gender,
          profilePic,
          geoLocation {
            lat,
            lng,
            lastUpdated
          }
        }
      }
    `
  },
  updateUserByAccountMessenger: () => {
    return `mutation updateUserByAccountMessenger($accountmessengers_id: ID!, $firstName: String, $lastName: String, $gender: String, $profilePic: String, $travelType: Int, $geoLocation: LocationInput){
        updateUserByAccountMessenger(accountmessengers_id: $accountmessengers_id, firstName: $firstName, lastName: $lastName, gender: $gender, profilePic: $profilePic, travelType: $travelType, geoLocation:$geoLocation) {
           id
          firstName,
          lastName,
          gender,
          profilePic,
          accountmessengers_id,
          travelType,
          geoLocation {
            lat,
            lng,
            lastUpdated
          }
        }
      }
    `
  }
};
