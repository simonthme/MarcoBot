module.exports = {
  createUser: () => {
    return `mutation createUser($accountmessengers_id: ID!, $PSID: ID! $firstName: String, $lastName: String, $gender: String, $profilePic: String){
        createUser(accountmessengers_id: $accountmessengers_id, PSID: $PSID, firstName: $firstName, lastName: $lastName, gender: $gender, profilePic: $profilePic) {
           id
          firstName,
          lastName,
          gender,
          PSID,
          accountmessengers_id,
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
      return `mutation updateUserByAccountMessenger($PSID: ID!, $firstName: String, $lastName: String, $gender: String, $profilePic: String, $travelType: String, $geoLocation: LocationInput){
        updateUserByAccountMessenger(PSID: $PSID, firstName: $firstName, lastName: $lastName, gender: $gender, profilePic: $profilePic, travelType: $travelType, geoLocation:$geoLocation) {
           id
          firstName,
          lastName,
          gender,
          profilePic,
          accountmessengers_id,
          PSID,
          travelType,
          geoLocation {
            lat,
            lng,
            lastUpdated
          }
        }
      }
    `
  },
  updateLocationByAccountMessenger: () => {
      return `mutation updateLocationByAccountMessenger($PSID: ID!, $firstName: String, $lastName: String, $gender: String, $profilePic: String, $travelType: String, $geoLocation: LocationInput){
        updateLocationByAccountMessenger(PSID: $PSID, firstName: $firstName, lastName: $lastName, gender: $gender, profilePic: $profilePic, travelType: $travelType, geoLocation:$geoLocation) {
           id
          firstName,
          lastName,
          gender,
          profilePic,
          accountmessengers_id,
          PSID,
          travelType,
          geoLocation {
            lat,
            lng,
            lastUpdated
          }
        }
      }
    `
  },
  addCategoryByAccountMessenger: () => {
      return `mutation addCategoryByAccountMessenger($PSID: ID!, $category: String) {
        addCategoryByAccountMessenger(PSID: $PSID, category: $category) {
           id
          firstName,
          lastName,
          gender,
          profilePic,
          PSID,
          travelType,
          geoLocation {
            lat,
            lng,
            lastUpdated
          },
          categories {
          name,
          weight
        }
      }
     }
    `
  }
};
