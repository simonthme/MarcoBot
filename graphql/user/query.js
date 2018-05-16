module.exports = {
  queryUser: (id) => {
    return `{
      userMessenger(id: "${id}") {
          id,
          firstName,
          lastName,
          createAt,
          gender,
          deleted,
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
        }
    }`
  },

};