module.exports = {
  createUser: () => {
    return `mutation createUser($accountmessengers_id: ID!, $firstName: String, $lastName: String, $gender: String, $profilePic: String){
        createUser(accountmessengers_id: $accountmessengers_id, firstName: $firstName, lastName: $lastName, gender: $gender, profilePic: $profilePic) {
           id
          firstName,
          lastName,
          gender,
          profilePic
        }
      }
    `
  },
  updateUserByAccountMessenger: () => {
    return `mutation updateUserByAccountMessenger($accountmessengers_id: ID!, $firstName: String, $lastName: String, $gender: String, $profilePic: String, $travelType: Int){
        updateUserByAccountMessenger(accountmessengers_id: $accountmessengers_id, firstName: $firstName, lastName: $lastName, gender: $gender, profilePic: $profilePic, travelType: $travelType) {
           id
          firstName,
          lastName,
          gender,
          profilePic,
          accountmessengers_id,
          travelType
        }
      }
    `
  }
};
