/**
 * Created by corentin on 02/05/2018.
 */
const apiMessenger = require('../helpers/apiMessenger');
const graphqlRequest = require('../helpers/apiGraphql');
const mutationAccountMessenger = require('../graphql/accountMessenger/mutation');
const mutationUser = require('../graphql/user/mutation');
module.exports = {
  createUser: (senderId) => {
    return new Promise((resolve, reject) => {
      apiMessenger.receiveProfileFacebook(senderId)
        .then((res) => {
          if (res.data) {
            const userToSave = {
              firstName: res.data.first_name,
              lastName: res.data.last_name,
              timezone: res.data.timezone,
              gender: res.data.gender,
              locale: res.data.locale,
              profilePic: res.data.profile_pic,
              PSID: senderId
            };
            // const mutationCreateAccount = mutationAccountMessenger.createAccountMessenger(userToSave.PSID,
            //   userToSave.locale, userToSave.timezone);
            const mutationCreateAccount = mutationAccountMessenger.createAccountMessenger();
            const mutationCreateUser = mutationUser.createUser();
            graphqlRequest.sendMutation(mutationCreateAccount, userToSave)
              .then(accountSaved => {
                console.log(accountSaved);
                if (accountSaved) {
                  userToSave.accountmessengers_id = userToSave.PSID;
                    graphqlRequest.sendMutation(mutationCreateUser, userToSave)
                    .then(userSaved=> {
                      return resolve(userSaved);
                    })
                    .catch(err => console.log(err));
                }

              })
              .catch(err =>  reject(err));
          }
        })
        .catch(err => reject(err));
    });
  },
};