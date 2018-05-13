/**
 * Created by corentin on 02/05/2018.
 */
const apiMessenger = require('../helpers/apiMessenger');
const graphqlRequest = require('../helpers/apiGraphql');
const mutationUserMessenger = require('../graphql/userMessenger/mutation');

module.exports = {
  createUser: (senderId) => {
    return new Promise((resolve, reject) => {
      apiMessenger.receiveProfileFacebook(senderId)
        .then((res) => {
          if (res.data) {
            const userToSave = {
              firstName: res.data.first_name,
              lastName: res.data.last_name,
              profilePic: res.data.profile_pic,
              timezone: res.data.timezone,
              gender: res.data.gender,
              locale: res.data.locale,
              PSID: senderId
            };
            const mutation = mutationUserMessenger.createUserMessenger(userToSave.PSID,
              userToSave.firstName, userToSave.lastName, userToSave.gender, userToSave.locale, userToSave.timezone);
            graphqlRequest.sendMutation(mutation, userToSave)
              .then(userSaved => {
                return resolve(userSaved)
              })
              .catch(err =>  reject(err));
          }
        })
        .catch(err => reject(err));
    });
  },
};