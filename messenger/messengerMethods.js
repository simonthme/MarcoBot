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
          if (res.body) {
            const resParsed = JSON.parse(res.body);
            const userToSave = {
              firstName: resParsed.first_name,
              lastName: resParsed.last_name,
              profilePic: resParsed.profile_pic,
              timezone: resParsed.timezone,
              gender: resParsed.gender,
              locale: resParsed.locale,
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