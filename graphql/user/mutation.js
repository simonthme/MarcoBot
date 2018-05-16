module.exports = {
  createUser: (accountmessengers_id, firstName, lastName, gender, profilePic) => {
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
  }
};
